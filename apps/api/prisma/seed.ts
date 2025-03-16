import { TestStatus } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  PrismaClient,
  QuestionCategory,
  QuestionType,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const interviewQuestions = [
  // General
  {
    originalId: 'g1',
    title: 'Mjesto stanovanja (ljeto/zima)',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g2',
    title: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g3',
    title: 'Što znaš o DUMP-u??',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g4',
    title: 'Očekivanja od Internshipa',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g5',
    title: 'Imaš li laptop na kojem možeš raditi?',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g6',
    title: 'Aktivnosti u slobodno vrijeme',
    type: 'Field',
    category: 'General',
  },
  {
    originalId: 'g7',
    title:
      'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području? (izvuć točnu brojku i vidit jel realna)',
    type: 'Field',
    category: 'General',
  },

  // Personal
  {
    originalId: 'p1',
    title: 'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p2',
    title:
      'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p3',
    title:
      'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p4',
    title:
      'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p5',
    title: 'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p6',
    title: 'Želis li postati član DUMP-a, ako da zašto?',
    type: 'Field',
    category: 'Personal',
  },
  {
    originalId: 'p7',
    title: 'Gdje se vidiš za 5 godina?',
    type: 'Field',
    category: 'Personal',
  },

  // Development
  {
    originalId: 'dev1',
    title: 'Zašto te zanima programiranje?',
    type: 'Field',
    category: 'Development',
  },
  {
    originalId: 'dev2',
    title: 'Radiš li ili jesi li negdje radio/la kao developer?',
    type: 'Field',
    category: 'Development',
  },
  {
    originalId: 'dev3',
    title:
      'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
    type: 'Field',
    category: 'Development',
  },
  {
    originalId: 'dev4',
    title:
      'Koje programske jezike koristiš? (koji ti je drazi, zasto, koliko iskustva ima sa tim jezikom, je li entuzijastican oko ijednog)',
    type: 'Field',
    category: 'Development',
  },
  {
    originalId: 'dev5',
    title: 'Imaš li neke projekte (github)?',
    type: 'Field',
    category: 'Development',
  },
  {
    originalId: 'dev6',
    title:
      'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme? Ili topic koji bi htio naucit u buducnosti?',
    type: 'Field',
    category: 'Development',
  },

  // Design
  {
    originalId: 'diz1',
    title: 'Zašto te zanima dizajn?',
    type: 'Field',
    category: 'Design',
  },
  {
    originalId: 'diz2',
    title: 'Koje te vrste dizajna zanimaju?',
    type: 'Field',
    category: 'Design',
  },
  {
    originalId: 'diz3',
    title: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
    type: 'Field',
    category: 'Design',
  },
  {
    originalId: 'diz4',
    title: 'Koje programe poznaješ?',
    type: 'Field',
    category: 'Design',
  },
  {
    originalId: 'diz5',
    title: 'Imaš li neke svoje radove? Možeš li nam pokazati/poslati?',
    type: 'Field',
    category: 'Design',
  },
  {
    originalId: 'diz6',
    title: 'Pratiš li neke dizajnere i ako da koje?',
    type: 'Field',
    category: 'Design',
  },

  // Marketing
  {
    originalId: 'mark1',
    title: 'Zašto te zanima marketing?',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark2',
    title: 'Koji dio marketinga te najviše zanima?',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark3',
    title:
      'Smatraš li se više kreativnom ili analitičkom osobom? Obrazloži odgovor.',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark4',
    title:
      'Imaš li iskustva u vođenju profila na društvenim mrežama? (Vidit zanima li je to i koje društvene mreže)',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark5',
    title: 'Poznaješ li neke od oglašivačkih alata (meta ads, google ads…)?',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark6',
    title:
      'Imaš li iskustva u pisanju blogova i sličnih tekstova? (PR-ovi, članci…)',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark7',
    title:
      'Postoji li nešto što nismo pokrili pitanjima u čemu imaš iskustva, a vezano je za marketing?',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark8',
    title: 'Komentari na Google formu',
    type: 'Field',
    category: 'Marketing',
  },
  {
    originalId: 'mark9',
    title: `1. pitanje iz Google forme`,
    type: 'Slider',
    category: 'Marketing',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'mark10',
    title: `2. pitanje iz Google forme`,
    type: 'Slider',
    category: 'Marketing',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'mark11',
    title: `3. pitanje iz Google forme`,
    type: 'Slider',
    category: 'Marketing',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'mark12',
    title: `4. pitanje iz Google forme`,
    type: 'Slider',
    category: 'Marketing',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'mark13',
    title: `5. pitanje iz Google forme`,
    type: 'Slider',
    category: 'Marketing',
    min: 1,
    max: 5,
    step: 1,
  },

  // Multimedia
  {
    originalId: 'mult1',
    title: 'Što te privuklo multimediji?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult2',
    title: 'Što inače slikaješ/snimaš?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult3',
    title:
      'Što ti je najzanimljivije između: slikavanja na eventima, montiranje videa, audio, streamanje?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult4',
    title: 'Kakvu vrstu fotografije preferiraš?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult5',
    title: 'Znaš li se koristit nekim programima?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult6',
    title: 'Imaš li fotoaparat?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult7',
    title:
      'Imas li portfolio? Jesi li sudjelovao na ikakvim projektima/edukacijama?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult8',
    title:
      'Koje fotografe/redatelje/yt kanale na temu multimedije pratiš (ako ih pratiš)?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult9',
    title: 'Kako bi opisao pripremu za slikavanje/snimanje?',
    type: 'Field',
    category: 'Multimedia',
  },
  {
    originalId: 'mult10',
    title: 'Gdje se vidiš za 5 godina s obzirom na ovo područje?',
    type: 'Field',
    category: 'Multimedia',
  },

  // Final
  {
    originalId: 'f1',
    title: `Količina slobodnog vremena koje posjeduje i spreman je ulozit prijavnik:
      1 - do 3 sata tjedno
      5 - 3 do 10 sati tjedno
      10 - preko 10 sati tjedno`,
    type: 'Slider',
    category: 'Final',
    min: 1,
    max: 10,
    step: 1,
  },
  {
    originalId: 'f2',
    title: `Želja za članstvom u DUMP koju je prijavnik pokazao:
    1 - Ne zna ništa o DUMPu i ne pokazuje pretjerane ambicije za ostankom u udruzi, prijavio se više iz želje da nauči
    5 - Zna nešto o radu DUMPa van internshipa, pokazuje da bi potencijalnu želju da bude član, ali već period od godine dana mu je predalek pa nemože se najlakše procijenit di će bit u budućnosti
    10 - Zna dosta o radu DUMPa, Daysima i Ciklusima, već sada ostavlja uvjerenje da ima dovoljnu želju da bude budući član`,
    type: 'Slider',
    category: 'Final',
    min: 1,
    max: 10,
    step: 1,
  },
  {
    originalId: 'f3',
    title: `Proaktivnost koju posjeduje i amicioznost koju pokazuje prijavnik:
    1 - Ne pokazuje ambicije
    5 - Jako veliki drive i ambicije, utjece na ljude oko sebe sa stvarima kojima se bavi
    `,
    type: 'Slider',
    category: 'Final',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'f4',
    title: `Iskustvo u polju koje je prijavio:
    1 - nema ga
    2 - ima minimalno, uglavnom sa faksa/iz škole
    3 - ima nešto malo, pokušavao je nešto sam ali nije ga išlo, nije ima puno vremena i sl.
    4 - ima iskustva, radia je sam i sa kolegama/prijateljima u slobodno vrijeme i istaka je par projekata koje ima (da je link na njih)
    5 - ostavia je dojam da većinu slobodnog vremena provodi radeći (bilo sam bilo na poslu) i eksperminetirajući, da je link na radove/portfolio i dojam je da bi podiga razinu tog polja u udruzi instantno`,
    type: 'Slider',
    category: 'Final',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'f5',
    title: `Culture fit procjena:
    1 - ne bi se uklopia lako, dojam je da bi prkosia mentalitetu i trenutnom stateu udruge
    2 - možda bi se uklopia, teško je procjenit jer nije ostavia dovoljan utisak (pretjerano je povućen)
    3 - solidan dojam, tu i tamo odudara od udruge u stavovima ali uklopia bi se uglavnom
    4 - uklopia bi se dosta dobro u ekipu, ali trebalo bi mu neko vrijeme/uklopia bi se kad bi se opustia
    5 - idealan fit za DUMP, uklopia bi se dosta brzo`,
    type: 'Slider',
    category: 'Final',
    min: 1,
    max: 5,
    step: 1,
  },
  {
    originalId: 'f6',
    title: 'Side notes',
    type: 'TextArea',
    category: 'Final',
  },
];

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1998-10-01T00:00:00.000Z'),
        },
        id: 'ante-roca',
      },
      {
        email: 'ante.roca2@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {},
        id: 'ante-roca2',
      },
      {
        email: 'ana.kovac@example.com',
        firstName: 'Ana',
        lastName: 'Kovač',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2003-03-01T00:00:00.000Z'),
        },
        id: 'ana-kovac',
      },
      {
        email: 'ivan.petrovic@example.com',
        firstName: 'Ivan',
        lastName: 'Petrović',
        interviewStatus: InterviewStatus.NoRight,
        data: {
          dateOfBirth: new Date('1999-01-01T00:00:00.000Z'),
        },
        id: 'ivan-petrovic',
      },
      {
        email: 'marija.juric@example.com',
        firstName: 'Marija',
        lastName: 'Jurić',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marija-juric',
      },
      {
        email: 'marko.horvat@example.com',
        firstName: 'Marko',
        lastName: 'Horvat',
        interviewStatus: InterviewStatus.Missed,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marko-horvat',
      },
      {
        email: 'petra.milic@example.com',
        firstName: 'Petra',
        lastName: 'Milić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2007-10-01T00:00:00.000Z'),
        },
        id: 'petra-milic',
      },
      {
        email: 'josip.knez@example.com',
        firstName: 'Josip',
        lastName: 'Knez',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2002-10-01T00:00:00.000Z'),
        },
        id: 'josip-knez',
      },
      {
        email: 'katarina.vidic@example.com',
        firstName: 'Katarina',
        lastName: 'Vidić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2003-10-01T00:00:00.000Z'),
        },
        id: 'katarina-vidic',
      },
      {
        email: 'tomislav.kos@example.com',
        firstName: 'Tomislav',
        lastName: 'Koš',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1995-10-01T00:00:00.000Z'),
        },
        id: 'tomislav-kos',
      },
      {
        email: 'mia.babic@example.com',
        firstName: 'Mia',
        lastName: 'Babić',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2000-10-01T00:00:00.000Z'),
        },
        id: 'mia-babic',
      },
    ],
  });

  await prisma.internDiscipline.createMany({
    data: [
      {
        internId: 'ante-roca',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        testScore: 51,
        priority: 1,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Approved,
        priority: 2,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Design,
        status: DisciplineStatus.Rejected,
        testStatus: TestStatus.Missed,
        priority: 3,
      },
      {
        internId: 'ana-kovac',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Design,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Missed,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 2,
      },
      {
        internId: 'marija-juric',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Rejected,
        priority: 1,
      },
      {
        internId: 'marko-horvat',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'petra-milic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Pending,
        priority: 1,
      },
      {
        internId: 'josip-knez',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
      {
        internId: 'katarina-vidic',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'tomislav-kos',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'mia-babic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
    ],
  });

  await prisma.interviewer.createMany({
    data: [
      {
        id: 'frane',
        name: 'Frane',
        email: 'frane@dump.hr',
        disciplines: [Discipline.Development],
      },
      {
        id: 'duje',
        name: 'Duje',
        email: 'duje@dump.hr',
        disciplines: [Discipline.Development, Discipline.Multimedia],
      },
      {
        id: 'ante',
        name: 'Ante',
        email: 'ante@dump.hr',
        disciplines: [
          Discipline.Multimedia,
          Discipline.Development,
          Discipline.Marketing,
          Discipline.Design,
        ],
      },
      {
        id: 'lovre',
        name: 'Lovre Tomić',
        email: 'lovre@dump.hr',
        disciplines: [Discipline.Development],
      },
    ],
  });

  await prisma.interviewSlot.create({
    data: {
      id: '1',
      start: new Date('2023-10-01T10:00:00.000Z'),
      end: new Date('2023-10-01T10:30:00.000Z'),
      answers: {},
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }, { interviewerId: 'duje' }],
        },
      },
    },
  });

  await prisma.interviewSlot.create({
    data: {
      id: '2',
      start: new Date('2023-10-01T10:30:00.000Z'),
      end: new Date('2023-10-01T11:00:00.000Z'),
      answers: {},
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }],
        },
      },
    },
  });

  await prisma.admin.createMany({
    data: [
      {
        email: 'admin@dump.hr',
        password: await bcrypt.hash('dump.1950', 10),
      },
    ],
  });

  await prisma.interviewQuestion.createMany({
    data: interviewQuestions.map((q) => ({
      title: q.title,
      type: q.type as QuestionType,
      category: q.category as QuestionCategory,
      min: q.min || null,
      max: q.max || null,
      step: q.step || null,
    })),
  });

  await prisma.interviewSlot.update({
    where: { id: '1' },
    data: { internId: 'ante-roca' },
  });

  await prisma.interviewSlot.update({
    where: { id: '2' },
    data: { internId: 'marija-juric' },
  });

  const questions = await prisma.interviewQuestion.findMany({
    where: {
      title: {
        in: [
          'Mjesto stanovanja (ljeto/zima)',
          'Koje programske jezike koristiš? (koji ti je drazi, zasto, koliko iskustva ima sa tim jezikom, je li entuzijastican oko ijednog)',
          `Količina slobodnog vremena koje posjeduje i spreman je ulozit prijavnik:
      1 - do 3 sata tjedno
      5 - 3 do 10 sati tjedno
      10 - preko 10 sati tjedno`,
          'Želis li postati član DUMP-a, ako da zašto?',
          '1. pitanje iz Google forme',
        ],
      },
    },
    orderBy: { title: 'asc' },
  });

  // Create answers for Ante Roca (slot 1)
  await prisma.interviewQuestionAnswer.createMany({
    data: [
      {
        questionId: questions[0].id,
        interviewSlotId: '1',
        value: { slider: 4 },
        flagged: false,
      },
      {
        questionId: questions[1].id,
        interviewSlotId: '1',
        value: {
          field: 'JavaScript i Python. Najviše iskustva imam s JavaScriptom.',
        },
        flagged: false,
      },
      {
        questionId: questions[2].id,
        interviewSlotId: '1',
        value: { slider: 8 },
        flagged: false,
      },
      {
        questionId: questions[3].id,
        interviewSlotId: '1',
        value: { field: 'Zagreb (ljeto), Split (zima)' },
        flagged: false,
      },
      {
        questionId: questions[4].id,
        interviewSlotId: '1',
        value: {
          field:
            'Da, želim učiti od iskusnih developera i raditi na realnim projektima.',
        },
        flagged: false,
      },
    ],
  });

  // Create answers for Marija Jurić (slot 2)
  await prisma.interviewQuestionAnswer.createMany({
    data: [
      {
        questionId: questions[0].id,
        interviewSlotId: '2',
        value: { slider: 3 },
        flagged: false,
      },
      {
        questionId: questions[1].id,
        interviewSlotId: '2',
        value: { field: 'C++ i Java, posebno me zanima game development.' },
        flagged: false,
      },
      {
        questionId: questions[2].id,
        interviewSlotId: '2',
        value: { slider: 6 },
        flagged: false,
      },
      {
        questionId: questions[3].id,
        interviewSlotId: '2',
        value: { field: 'Zadar cijelu godinu' },
        flagged: true,
      },
      {
        questionId: questions[4].id,
        interviewSlotId: '2',
        value: {
          field: 'Još razmišljam, ali zanima me rad u timskom okruženju.',
        },
        flagged: false,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
