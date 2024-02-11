export const env = {
  production: false
};

// Versione applicazione
export const VERSION = "7.0.1"

export const WS_BASE_URL = `https://fantashitcup.altervista.org/WorldWideFantashit/web-services`

export const ASSETS_BASE_URL = `https://fantashitcup.altervista.org/WorldWideFantashit/ShitCup/assets`

export const WHATSAPP_URL = `https://chat.whatsapp.com/JICQWVbYoqCKh9gek92EIW`


// Timeout richieste POST
export const REQUEST_TIMEOUT = 2 * 60 * 1000 // 2 minuti

// Tentativi richieste POST
export const REQUEST_RETRIES = 3

export const INIBITO = "1"

export const MAX_IMG = 40000

export const SERVICE_TYPE = {
  ADMIN: "/admin/",
  PLAYER: "/player/",
  AUT: "/autenticazione/",
  FANTA: "/fantagazzetta/"
}

//STORAGE
export const TOKEN_STORAGE = "tk-user-shit-cup";
export const LANGUAGE_STORAGE = "shit-cup-language";
export const LABEL_STORAGE = "shit-cup-label";

export const ADMIN_SERVICE = {

  GET_ADMINISTRATOR: "get_administrator",
  UPD_DETAIL_UTENTE: "upd_detail_utente",
  DEL_SQUADRA: "del_squadra",
  DEL_ROSA_UTENTE: "del_rosa_utente",
  SET_CALCOLO_GIORNATA: "set_calcolo_giornata",
  SET_SVINCOLATI: "set_svincolati",
  SET_ROSA_UTENTE: "set_rosa_utente",
  GET_FORMAZIONI_BY_GIORNATA: "get_formazioni_by_giornata",
  RECUPERA_SCHIERAMENTO: "recupera_schieramento",
  SET_COMUNICAZIONE: "set_comunicazione",
  ASSOCIA_COMUNICAZIONE: "associa_comunicazione",
  GET_GENERA_COMPETIZIONE_GIRONI: "get_genera_competizione_gironi",
  SET_GENERA_COMPETIZIONE_GIRONI: "set_genera_competizione_gironi",
  GET_GENERA_COMPETIZIONE_ELIMINATORIE: "get_genera_competizione_eliminatorie",
  SET_GENERA_COMPETIZIONE_ELIMINATORIE: "set_genera_competizione_eliminatorie",
  UPD_PLAYER_UTENTE: "upd_player_utente",
  UPD_GIORNATA: "upd_giornata",
  SET_GIORNATA: "set_giornata",
  GET_ACCOPPIAMENTI: "get_accoppiamenti",
  SET_ACCOPPIAMENTO: "set_accoppiamento",
  UPD_ACCOPPIAMENTO: "upd_accoppiamento",
  DEL_ACCOPPIAMENTO: "del_accoppiamento",
  DEL_OBJECT_BY_ID: "del_object_by_id",
  GET_ALL_OBJECTS: "get_all_objects",
  UPD_CALCIATORE: "upd_calciatore"

}

export const PLAYER_SERVICE = {

  GET_ALL_ROSE_UTENTI: "get_all_rose_utenti",
  UPD_UTENTE: "upd_utente",
  GET_AVATARS: "get_avatars",
  GET_INFO_UTENTE: "get_info_utente",
  GET_DASHBOARD: "get_dashboard",
  GET_CALENDARIO_RISULTATI: "get_calendario_risultati",
  GET_CLASSIFICHE: "get_classifiche",
  GET_FORMAZIONI_INSERITE: "get_formazioni_inserite",
  GET_CONVOCABILI: "get_convocabili",
  GET_VIEW_MATCH: "get_view_match",
  SET_SCHIERAMENTO: "set_schieramento",
  GET_COMUNICAZIONI: "get_comunicazioni",
  UPGRADE_ROSA: "upgrade_rosa",
  DEL_SQUADRA: "del_squadra"

}

export const FANTA_SERVICE = {

  GET_PROBABILI_FORMAZIONI: "get_probabili_formazioni",
  GET_VOTI_LIVE: "get_voti_live",
  GET_LEGA: "get_lega"

}

export const AUTH_SERVICE = {

  RECUPERA_PASSWORD: "recupera_password",
  REGISTER_MAIL: "register_mail",
  INFO: "info",
  REGISTRA_UTENTE: "registra_utente",
  REGISTRA_SQUADRA: "registra_squadra",
  GET_REGISTER: "get_register",
  GET_CREA_SQUADRA: "get_crea_squadra"

}

export const LOGIN_PAGE = {

  SIGN_IN: 1,
  REGISTER: 2,
  REC_PASS: 3

}

export const ALERT_MSG = {
  SUCCESS: "Incredibile ha funzionato",
  ERRORR: "Errore di sistema"
}

export const SUB_PAGE_ADMIN = {

  VIEW: 0,
  COMPETIZIONE: {
    RECUPERO: 1,
    CALCOLO: 2,
    VIEW_POSSIBILI: [
      { id: 1, descrizione: "RECUPERO" },
      { id: 2, descrizione: "CALCOLO" }
    ]
  },
  ACCOPPIAMENTI: {
    DATE_PARTITE: 1,
    ELIMINATORIE: 2,
    SORTEGGI: 3,
    VIEW_POSSIBILI: [
      { id: 1, descrizione: "DATE" },
      { id: 2, descrizione: "PARTITE" },
      { id: 3, descrizione: "SORTEGGI" }
    ]
  },
  CALCIATORI: {
    SVINCOLATI: 1,
    CARICA_SQUADRE: 2,
    SOSTITUISCI: 3,
    NICKNAME: 4,
    VIEW_POSSIBILI: [
      { id: 1, descrizione: "SVINCOLATI" },
      { id: 2, descrizione: "CARICA" },
      { id: 3, descrizione: "SOSTITUISCI" },
      { id: 4, descrizione: "NICKNAME" }
    ]
  },
  NOTIFICHE: {
    SCRIVI: 1,
    INVIA: 2,
    VIEW_POSSIBILI: [
      { id: 1, descrizione: "SCRIVI" },
      { id: 2, descrizione: "INVIA" }
    ]
  }

}

export const BOLEANO = [
  {
    valore: "1",
    descrizione: "SI"
  },
  {
    valore: "0",
    descrizione: "NO"
  }
]