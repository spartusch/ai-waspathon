package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.NotNull;

public record Avatar(
        @NotNull String imageAsBase64
) {}
