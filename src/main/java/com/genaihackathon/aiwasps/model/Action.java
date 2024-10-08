package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.NotNull;

public record Action(
        @NotNull String title,
        @NotNull String description
) {}
