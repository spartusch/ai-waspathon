package com.genaihackathon.aiwasps.service;

import com.genaihackathon.aiwasps.model.Person;
import com.genaihackathon.aiwasps.model.Todo;
import com.genaihackathon.aiwasps.model.UserMail;
import com.genaihackathon.aiwasps.model.UserMailHistoricEntry;
import com.genaihackathon.aiwasps.repository.UserMailRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.atomic.AtomicInteger;

@AnonymousAllowed
@BrowserCallable
public class TodoService {

    @Value("classpath:/todo-prompt-system.st")
    private Resource systemResource;

    @Value("classpath:/todo-prompt-user.st")
    private Resource userResource;

    private final UserMailRepository userMailRepository;
    private final SettingsService settingsService;
    private final ChatClient chatClient;

    private List<Todo> todoCache = new ArrayList<>();

    public TodoService(
            UserMailRepository userMailRepository,
            SettingsService settingsService,
            ChatClient chatClient
    ) {
        this.userMailRepository = userMailRepository;
        this.settingsService = settingsService;
        this.chatClient = chatClient;
    }

    public List<Todo> getAll() {
        if (todoCache.isEmpty()) {
            todoCache = generateTodos();
        }
        return todoCache;
    }

    private List<Todo> generateTodos() {
        AtomicInteger idCount = new AtomicInteger(0);
        var todoFuture = userMailRepository.getMails()
                .stream()
                .map(mail -> analyzeEmail(idCount.incrementAndGet(), mail))
                .toList();
        var all = CompletableFuture.allOf(
                todoFuture.toArray(new CompletableFuture[0])
        );
        all.join();

        var results = new ArrayList<Todo>();
        todoFuture.stream()
                .map(CompletableFuture::join)
                .forEach(results::add);

        results.sort(Comparator.comparing(Todo::priority).reversed());

        return results;
    }

    private CompletableFuture<Todo> analyzeEmail(Integer id, UserMail mail) {
        var userMessage = new PromptTemplate(userResource).createMessage(
                Map.of(
                        "emailAddress", mail.senderEmail(),
                        "emailText", mail.body()
                )
        );
        var systemMessage = new SystemPromptTemplate(systemResource).createMessage(
                Map.of(
                        "customPrompt", settingsService.getCustomPrompt()
                )
        );
        var prompt = new Prompt(List.of(systemMessage, userMessage));

        return CompletableFuture.supplyAsync(
                () -> {
                    var analyzed = chatClient
                            .prompt(prompt)
                            .advisors(new SimpleLoggerAdvisor())
                            .call()
                            .entity(Todo.class);
                    return new Todo(
                            id,
                            analyzed.action(),
                            new Person(analyzed.person().firstName(), analyzed.person().lastName(), mail.senderEmail()),
                            analyzed.priority(),
                            mail.body(),
                            analyzed.emotions(),
                            analyzed.gender(),
                            mail.communicationHistory()
                                    .stream()
                                    .map(UserMailHistoricEntry::message)
                                    .toList(),
                            null
                    );
                }
        );
    }
}