package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserMailHistoricEntry(
        @NotNull @Email String from,
        @NotNull @Email String to,
        @NotNull String message
) {
}
