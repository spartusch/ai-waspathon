package com.genaihackathon.aiwasps.service;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;

@AnonymousAllowed
@BrowserCallable
public class EmailReplyService {

    @Value("classpath:/email-reply-system.st")
    private Resource systemResource;

    @Value("classpath:/email-reply-user.st")
    private Resource userResource;

    private final ChatClient chatClient;
    private final SettingsService settingsService;

    public EmailReplyService(
            ChatClient chatClient,
            SettingsService settingsService
    ) {
        this.chatClient = chatClient;
        this.settingsService = settingsService;
    }

    public Flux<String> formulateResponse(String mail, String politenessLevel) {
        var userMessage = new PromptTemplate(userResource).createMessage(
                Map.of(
                        "emailText", mail
                )
        );
        var systemMessage = new SystemPromptTemplate(systemResource).createMessage(
                Map.of(
                        "politenessLevel", politenessLevel,
                        "customPrompt", settingsService.getCustomPrompt()
                )
        );
        var prompt = new Prompt(List.of(systemMessage, userMessage));

        return chatClient.prompt(prompt)
                .advisors(new SimpleLoggerAdvisor())
                .stream()
                .content();
    }
}