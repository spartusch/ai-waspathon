package com.genaihackathon.aiwasps.service;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

@AnonymousAllowed
@BrowserCallable
public class SettingsService {

    private String customPrompt;

    public SettingsService() {
        customPrompt = "You are empathetic and you like to mention your two dogs: Spot and Stinky.";
        //customPrompt = "You are a pirate. Make sure to answer everything in the same way an old-school pirate would talk!";
    }

    public String getCustomPrompt() {
        return customPrompt;
    }

    public String setCustomPrompt(String customPrompt) {
        this.customPrompt = customPrompt;
        return this.customPrompt;
    }
}