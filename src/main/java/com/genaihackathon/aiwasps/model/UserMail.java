package com.genaihackathon.aiwasps.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserMail(
        @NotNull String subjectLine,
        @NotNull String body,
        @Email @NotNull String senderEmail,
        @Email @NotNull String recipientEmail,
        List<UserMailHistoricEntry> communicationHistory
) {
}