export interface ExampleUnit {
    id: number;
    enhet: string;
    hsaid: string;
    agare: string;
    namnd: string;
    vald: boolean;
    enhetskod: number;
    details: ExampleUnitDetails;
    isActive: boolean;
}

export interface ExampleUnitDetails {
    versions: number[];
    avtalskod: number;
    enhet: string;
    avtalsperiod_start: Date;
    avtalsperiod_slut: Date;
    enhetschef: string;
    enhetschef_telefon: string;
    enhetschef_epost: string;
    agare_kod: number;
    agare_form: string;
    organisationsnummer: string;
    utbetalningsssätt: string;
    kontonummer: string;
    postadress_gata: string;
    postadress_postnummer: string;
    postadress_stad: string;
    besoksadress_gata: string;
    besoksadress_postnummer: string;
    besoksadress_stad: string;
    kommun: string;
    kommunkod: number;
    geokod: string;
    telefon: string;
    leverantorsid_RD: string;
    kundreferens: string;
    medverkanfamiljecentral: string;
    regionsovergripandegrupper: string;
    justeringar: ExampleUnitJusteringar[];

}
export interface ExampleUnitJusteringar {
    typ: string;
    betalningavser: string;
    belopp: number;
}
