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
    data: [
      {
        question: 'Mjesto stanovanja (ljeto/zima)',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Što znaš o DUMP-u??',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Očekivanja od Internshipa?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Imaš li laptop na kojem možeš raditi?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question: 'Aktivnosti u slobodno vrijeme',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question:
          'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području? (izvuć točnu brojku i vidit jel realna)',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        question:
          'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question:
          'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question:
          'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question:
          'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question:
          'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question: 'Želis li postati član DUMP-a, ako da zašto?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        question: 'Gdje se vidiš za 5 godina?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },

      {
        question: 'Zašto te zanima programiranje?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question: 'Radiš li ili jesi li negdje radio/la kao developer?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question:
          'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question:
          'Koje programske jezike koristiš? (koji ti je drazi, zasto, koliko iskustva ima sa tim jezikom, je li entuzijastican oko ijednog)',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question: 'Imaš li neke projekte (github)?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question:
          'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme? Ili topic koji bi htio naucit u buducnosti?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        question: 'Zašto te zanima dizajn?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Koje te vrste dizajna zanimaju?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Koje programe poznaješ?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Imaš li neke svoje radove? Možeš li nam pokazati/poslati?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Pratiš li neke dizajnere i ako da koje?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        question: 'Zašto te zanima marketing?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question: 'Koji dio marketinga te najviše zanima?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question:
          'Smatraš li se više kreativnom ili analitičkom osobom? Obrazloži odgovor.',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question:
          'Imaš li iskustva u vođenju profila na društvenim mrežama? (Vidit zanima li je to i koje društvene mreže)',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question:
          'Poznaješ li neke od oglašivačkih alata (meta ads, google ads…)?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question:
          'Imaš li iskustva u pisanju blogova i sličnih tekstova? (PR-ovi, članci…)',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question:
          'Postoji li nešto što nismo pokrili pitanjima u čemu imaš iskustva, a vezano je za marketing?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question: 'Komentari na Google formu',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        question: `1. pitanje iz Google forme`,
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `2. pitanje iz Google forme`,
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `3. pitanje iz Google forme`,
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `4. pitanje iz Google forme`,
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `5. pitanje iz Google forme`,
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: 'Što te privuklo multimediji?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Što inače slikaješ/snimaš?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question:
          'Što ti je najzanimljivije između: slikavanja na eventima, montiranje videa, audio, streamanje?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Kakvu vrstu fotografije preferiraš?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Znaš li se koristit nekim programima?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Imaš li fotoaparat?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question:
          'Imas li portfolio? Jesi li sudjelovao na ikakvim projektima/edukacijama?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question:
          'Koje fotografe/redatelje/yt kanale na temu multimedije pratiš (ako ih pratiš)?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Kako bi opisao pripremu za slikavanje/snimanje?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: 'Gdje se vidiš za 5 godina s obzirom na ovo područje?',
        type: QuestionType.Field,
        category: QuestionCategory.Multimedia,
      },
      {
        question: `Količina slobodnog vremena koje posjeduje i spreman je ulozit prijavnik:
      1 - do 3 sata tjedno
      5 - 3 do 10 sati tjedno
      10 - preko 10 sati tjedno`,
        type: QuestionType.Slider,
        category: QuestionCategory.Final,
        minValue: 1,
        maxValue: 10,
        stepValue: 1,
      },
      {
        question: `Želja za članstvom u DUMP koju je prijavnik pokazao:
    1 - Ne zna ništa o DUMPu i ne pokazuje pretjerane ambicije za ostankom u udruzi, prijavio se više iz želje da nauči
    5 - Zna nešto o radu DUMPa van internshipa, pokazuje da bi potencijalnu želju da bude član, ali već period od godine dana mu je predalek pa nemože se najlakše procijenit di će bit u budućnosti
    10 - Zna dosta o radu DUMPa, Daysima i Ciklusima, već sada ostavlja uvjerenje da ima dovoljnu želju da bude budući član`,
        type: QuestionType.Slider,
        category: QuestionCategory.Final,
        minValue: 1,
        maxValue: 10,
        stepValue: 1,
      },
      {
        question: `Proaktivnost koju posjeduje i amicioznost koju pokazuje prijavnik:
    1 - Ne pokazuje ambicije
    5 - Jako veliki drive i ambicije, utjece na ljude oko sebe sa stvarima kojima se bavi
    `,
        type: QuestionType.Slider,
        category: QuestionCategory.Final,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `Iskustvo u polju koje je prijavio:
    1 - nema ga
    2 - ima minimalno, uglavnom sa faksa/iz škole
    3 - ima nešto malo, pokušavao je nešto sam ali nije ga išlo, nije ima puno vremena i sl.
    4 - ima iskustva, radia je sam i sa kolegama/prijateljima u slobodno vrijeme i istaka je par projekata koje ima (da je link na njih)
    5 - ostavia je dojam da većinu slobodnog vremena provodi radeći (bilo sam bilo na poslu) i eksperminetirajući, da je link na radove/portfolio i dojam je da bi podiga razinu tog polja u udruzi instantno`,
        type: QuestionType.Slider,
        category: QuestionCategory.Final,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: `Culture fit procjena:
    1 - ne bi se uklopia lako, dojam je da bi prkosia mentalitetu i trenutnom stateu udruge
    2 - možda bi se uklopia, teško je procjenit jer nije ostavia dovoljan utisak (pretjerano je povućen)
    3 - solidan dojam, tu i tamo odudara od udruge u stavovima ali uklopia bi se uglavnom
    4 - uklopia bi se dosta dobro u ekipu, ali trebalo bi mu neko vrijeme/uklopia bi se kad bi se opustia
    5 - idealan fit za DUMP, uklopia bi se dosta brzo`,
        type: QuestionType.Slider,
        category: QuestionCategory.Final,
        minValue: 1,
        maxValue: 5,
        stepValue: 1,
      },
      {
        question: 'Side notes',
        type: QuestionType.TextArea,
        category: QuestionCategory.Final,
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
