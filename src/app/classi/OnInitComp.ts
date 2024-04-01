
import { ALERT_MSG, LOGIN_PAGE, PAGE } from 'src/environments/costanti';
import { CondizioneGirone, FasiCompetizione, PeriodoGiornata, RuoliUtente, StatiSquadra } from 'src/environments/enums';

export abstract class OnInitComp {

    loading_btn: boolean = false;
    loading_page: boolean = false;
    loading_table: boolean = false;

    LOGIN_PAGE = LOGIN_PAGE;

    ALERT_MSG = ALERT_MSG;

    //enums
    PERIODO_GIORNATA = PeriodoGiornata;
    STATI_SQUADRA = StatiSquadra;
    RUOLI_UTENTE = RuoliUtente;
    CONDIZIONE_GIRONE = CondizioneGirone;
    FASE_COMPETIZIONE = FasiCompetizione;

}