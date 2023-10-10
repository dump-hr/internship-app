import {
  MultistepQuestion,
  Question,
  QuestionType,
} from '@internship-app/types';

import { QuestionCategory } from '../../constants/interviewConstants';

export const interviewQuestions: Array<MultistepQuestion<QuestionCategory>> = [
  // General
  {
    id: 'g1',
    title: 'Mjesto stanovanja (ljeto/zima)',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'g2',
    title: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'g3',
    title: 'Očekivanja od Internshipa?',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'g4',
    title: 'Imaš li laptop na kojem možeš raditi?',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'g5',
    title: 'Aktivnost u slobodno vrijeme',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'g6',
    title:
      'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području? (izvuć točnu brojku i vidit jel realna)',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },

  // Personal
  {
    id: 'p1',
    title: 'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p2',
    title:
      'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p3',
    title:
      'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p4',
    title:
      'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p5',
    title: 'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p6',
    title: 'Koje je po tebi idealno radno okruženje?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p7',
    title: 'Želis li postati član DUMP-a, ako da zašto?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p8',
    title:
      'Kad bi postao član imaš li nekih ambicija ili vještina koje nisu pokrivene sa ova četiri područja koja bi mogao raditi?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },
  {
    id: 'p9',
    title: 'Gdje se vidiš za 5 godina?',
    type: QuestionType.Field,
    category: QuestionCategory.Personal,
  },

  // Development
  {
    id: 'dev1',
    title: 'Zašto te zanima programiranje?',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev2',
    title: 'Radiš li ili jesi li negdje radio/la kao developer?',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev3',
    title:
      'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev4',
    title:
      'Koje programske jezike koristiš? (koji ti je drazi, zasto, koliko iskustva ima sa tim jezikom, je li entuzijastican oko ijednog)',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev5',
    title: 'Imaš li portfolio projekata/github?',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev6',
    title:
      'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme? Ili topic koji bi htio naucit u buducnosti?',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'dev7',
    title:
      'Ako je netko bezobrazan dodat neko tehnicko overkill pitanje npr n+1, razlika izmedu stabilnog i nestabilnog sorting algoritma, depth binary tree search',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },

  // Design
  {
    id: 'diz1',
    title: 'Zašto te zanima dizajn?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },
  {
    id: 'diz2',
    title: 'Koje te vrste dizajna zanimaju?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },
  {
    id: 'diz3',
    title: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },
  {
    id: 'diz4',
    title: 'Koje programe poznaješ?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },
  {
    id: 'diz5',
    title: 'Imaš li portfolio nekih svojih radova?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },
  {
    id: 'diz6',
    title: 'Pratiš li neke dizajnere i ako da koje?',
    type: QuestionType.Field,
    category: QuestionCategory.Design,
  },

  // Marketing
  {
    id: 'mark1',
    title: 'Zašto te zanima marketing?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark2',
    title:
      'Smatraš li se više kreativnom ili analitičkom osobom? Obrazloži odgovor.',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark3',
    title: 'Imaš li iskustva u vođenju profila na društvenim mrežama?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark4',
    title: 'Poznaješ li neke od oglašivačkih alata (fb ads, google ads…)?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark5',
    title: 'Imaš li iskustva u pisanju blogova i sličnih tekstova?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark6',
    title:
      'Postoji li nešto što nismo pokrili pitanjima u čemu imaš iskustva, a vezano je za marketing?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark7',
    title:
      'Možeš li navesti primjer neke dobre/upečatljive marketinške kampanje?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },
  {
    id: 'mark8',
    title: 'Koji dio marketinga te najviše zanima?',
    type: QuestionType.Field,
    category: QuestionCategory.Marketing,
  },

  // Multimedia
  {
    id: 'mult1',
    title: 'Što te privuklo multimediji?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult2',
    title: 'Što inače slikaješ/snimaš?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult3',
    title: 'Jesi li sudjelovao naikakvim projektima?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult4',
    title:
      'Što ti je najzanimljivije između: slikavanja na eventima, montiranje videa, audio, streamanje?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult5',
    title: 'Kakvu vrstu fotografije preferiraš?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult6',
    title: 'Znaš li se koristit nekim programima?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult7',
    title: 'Imaš li fotoaparat?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult8',
    title: 'Imas li portfolio?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult9',
    title:
      'Koje fotografe/redatelje/yt kanale na temu multimedije pratiš (ako ih pratiš)?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult10',
    title: 'Kako bi opisao pripremu za slikavanje/snimanje?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },
  {
    id: 'mult11',
    title: 'Gdje se vidiš za 5 godina s obzirom na ovo područje?',
    type: QuestionType.Field,
    category: QuestionCategory.Multimedia,
  },

  // Final
  {
    id: 'f1',
    title: `Količina slobodnog vremena koje posjeduje i spreman je ulozit prijavnik:
      1 - do 3 sata tjedno
      5 - 3 do 10 sati tjedno
      10 - preko 10 sati tjedno`,
    type: QuestionType.Slider,
    category: QuestionCategory.Final,
    min: 1,
    max: 10,
    step: 1,
  },
  {
    id: 'f2',
    title: `Želja za članstvom u DUMP koju je prijavnik pokazao:
    1 - Nezna ništa o DUMPu i ne pokazuje pretjerane ambicije za ostankom u udruzi, prijavio se više iz želje da nauči
    5 - Zna nešto o radu DUMPa van internshipa, pokazuje da bi potencijalnu želju da bude član, ali već period od godine dana mu je predalek pa nemože se najlakše procijenit di će bit u budućnosti
    10 - Zna dosta o radu DUMPa, Daysima i Ciklusima, već sada ostavlja uvjerenje da ima dovoljnu želju da bude budući član`,
    type: QuestionType.Slider,
    category: QuestionCategory.Final,
    min: 1,
    max: 10,
    step: 1,
  },
  {
    id: 'f3',
    title: `Proaktivnost koju posjeduje i amicioznost koju pokazuje prijavnik:
    1 - Ne pokazuje ambicije
    5 - Jako veliki drive i ambicije, utjece na ljude oko sebe sa stvarima kojima se bavi
    `,
    type: QuestionType.Slider,
    category: QuestionCategory.Final,
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: 'f4',
    title: `Iskustvo u polju koje je prijavio:
    1 - nema ga
    2 - ima minimalno, uglavnom sa faksa/iz škole
    3 - ima nešto malo, pokušavao je nešto sam ali nije ga išlo, nije ima puno vremena i sl.
    4 - ima iskustva, radia je sam i sa kolegama/prijateljima u slobodno vrijeme i istaka je par projekata koje ima (da je link na njih)
    5 - ostavia je dojam da većinu slobodnog vremena provodi radeći (bilo sam bilo na poslu) i eksperminetirajući, da je link na radove/portfolio i dojam je da bi podiga razinu tog polja u udruzi instantno`,
    type: QuestionType.Slider,
    category: QuestionCategory.Final,
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: 'f5',
    title: `Culture fit procjena:
    1 - ne bi se uklopia lako, dojam je da bi prkosia mentalitetu i trenutnom stateu udruge
    2 - možda bi se uklopia, teško je procjenit jer nije ostavia dovoljan utisak (pretjerano je povućen)
    3 - solidan dojam, tu i tamo odudara od udruge u stavovima ali uklopia bi se uglavnom
    4 - uklopia bi se dosta dobro u ekipu, ali trebalo bi mu neko vrijeme/uklopia bi se kad bi se opustia
    5 - idealan fit za DUMP, uklopia bi se dosta brzo`,
    type: QuestionType.Slider,
    category: QuestionCategory.Final,
    min: 1,
    max: 5,
    step: 1,
  },
  {
    id: 'f6',
    title: 'Side notes',
    type: QuestionType.TextArea,
    category: QuestionCategory.Final,
  },
];

const getDefaultValues = (questions: Question[]): { [key: string]: string } => {
  const defaultValueForQuestion = (q: Question) => {
    switch (q.type) {
      case QuestionType.Select:
        return q.options[0];
      case QuestionType.Slider:
        return Math.floor((q.min + q.max) / 2);
      default:
        return '';
    }
  };

  return questions.reduce(
    (obj, q) => ({
      ...obj,
      [`${q.id}`]: {
        value: defaultValueForQuestion(q),
        tick: false,
      },
    }),
    {},
  );
};

export const defaultInterviewValues = getDefaultValues(interviewQuestions);
