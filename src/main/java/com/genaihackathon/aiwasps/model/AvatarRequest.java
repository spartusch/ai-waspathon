package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record AvatarRequest(
        @NotNull String gender,
        @NotNull Set<String> emotions
) {}
