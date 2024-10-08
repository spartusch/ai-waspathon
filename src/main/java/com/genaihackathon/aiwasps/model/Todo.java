package com.genaihackathon.aiwasps.model;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record Todo(
        @NotNull Integer id,
        @NotNull Action action,
        @NotNull Person person,
        @NotNull Integer priority,
        @NotNull String originalMessage,
        @NotNull List<String> emotions,
        @NotNull String gender,
        @Nullable List<String> followUpMails,
        @Nullable String avatarUrl
) {}
