import { Button, VerticalLayout, HorizontalLayout, TextArea } from '@vaadin/react-components'
import React, { useEffect } from "react";
import { SettingsService } from "Frontend/generated/endpoints";
import { Notification } from '@vaadin/react-components/Notification.js';
import { useNavigate } from "react-router-dom";

export default function SettingsView() {
    const [textArea, setTextArea] = React.useState<string>('');
    const navigate = useNavigate();
    useEffect(() => {
        const callSettings = async () => {
            const response = await SettingsService.getCustomPrompt();
            setTextArea(response);
        }
        void callSettings();
    }, []);
    return (
        <VerticalLayout style={{padding: '1rem'}}>
            <TextArea label="Enter your custom prompt here:"
                      value={textArea}
                      onChange={(e) => setTextArea(e.target.value)}
                      style={{width: '100%', minHeight: '10rem'}}/>
            <HorizontalLayout theme="spacing padding" style={{width: '100%', justifyContent: 'flex-end'}}>
                {!!localStorage.getItem("todo") && (
                    <Button onClick={async () => {
                        navigate("/mail");
                    }}>Reply to First Task</Button>
                )}
                <Button onClick={async () => {
                    await SettingsService.setCustomPrompt(textArea);
                    const notification = Notification.show('Custom prompt saved', {
                        position: 'top-center',
                        duration: 1500,
                        theme: 'success',
                    });
                }}>Save</Button>
            </HorizontalLayout>
        </VerticalLayout>
    );
}
