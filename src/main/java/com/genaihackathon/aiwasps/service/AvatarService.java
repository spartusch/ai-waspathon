package com.genaihackathon.aiwasps.service;

import com.genaihackathon.aiwasps.model.Avatar;
import com.genaihackathon.aiwasps.model.AvatarRequest;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import org.springframework.ai.image.ImageMessage;
import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.openai.OpenAiImageOptions;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import static org.springframework.ai.openai.api.OpenAiImageApi.ImageModel.DALL_E_3;

@AnonymousAllowed
@BrowserCallable
public class AvatarService {

    private final ImageModel imageModel;
    private final Map<AvatarRequest, Avatar> avatarCache = new ConcurrentHashMap<>();

    public AvatarService(ImageModel imageModel) {
        this.imageModel = imageModel;
    }

    public Avatar getAvatarAsBase64(String gender, Set<String> emotions) {
        var request = new AvatarRequest(gender, emotions);
        return avatarCache.computeIfAbsent(request, req -> new Avatar(computeImage(req)));
    }

    private String computeImage(AvatarRequest request) {
        var message = String.format("flat vector illustration style portrait of a digital avatar face, a %s trendsetter young urban professional and being %s",
                request.gender(),
                String.join(",", request.emotions())
        );
        var imageResponse = imageModel.call(
                new ImagePrompt(new ImageMessage(message),
                        OpenAiImageOptions.builder()
                                .withModel(DALL_E_3.getValue())
                                .withResponseFormat("b64_json")
                                .withHeight(1024)
                                .withWidth(1024)
                                .build()
                )
        ).getResult();
        return imageResponse.getOutput().getB64Json();
    }
}