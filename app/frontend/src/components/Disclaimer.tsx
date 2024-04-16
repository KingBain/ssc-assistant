import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Cookies from "js-cookie";

export const Disclaimer = () => {
    const { t, i18n } = useTranslation();

    const setTranslationCookie = () => {
        Cookies.set("lang_setting", i18n.language, {
            expires: 30,
        });
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const [hideDialog, setHideDialog] = useState(false);

    useEffect(() => {
        const disclaimerAccepted = Cookies.get("disclaimer_accepted");
        if (disclaimerAccepted === "true") {
            setHideDialog(true);
        }
    }, []);

    const handleAccept = () => {
        setDisclaimerCookie();
        setHideDialog(true);
    };

    const setDisclaimerCookie = () => {
        Cookies.set("disclaimer_accepted", "true", {
            expires: 1, // expires after 1 day (24 hours)
        });
    }

    return (
        <div>
            <Dialog open={!hideDialog} fullWidth>
                <DialogTitle>{t("disclaimer")}</DialogTitle>
                <DialogContent>
                    <p>{t("disclaimer.desc")}</p>
                    <p style={{ fontWeight: "bold" }}>{t("disclaimer.desc2")}</p>
                </DialogContent>
                <DialogActions>
                    <Button style={{ backgroundColor: "#4b3e99", color: "white"}} onClick={handleAccept}>{t("accept")}</Button>
                    <Button onClick={() => { changeLanguage(t("langlink.shorthand")); setTranslationCookie(); }}>{t("langlink")}</Button>
                </DialogActions>
            </Dialog>
        </div> 
    );
};
