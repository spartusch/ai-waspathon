package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.NotNull;

public record Person(
        @NotNull String firstName,
        @NotNull String lastName,
        @NotNull String email
) {}
