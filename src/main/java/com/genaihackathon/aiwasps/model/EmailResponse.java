package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.NotNull;

public record EmailResponse(
        @NotNull String subject,
        @NotNull String text
) {}
