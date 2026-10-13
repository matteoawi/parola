"""Authored learning content. Regenerate JSON without changing the original phrase corpus."""
from pathlib import Path
import json
R=Path(__file__).resolve().parents[1]
langs=['it','en','ar','ru']
def L(*values):return dict(zip(langs,values))
course=json.loads((R/'data/course.json').read_text(encoding='utf-8'))
course['version']=(R/'VERSION').read_text(encoding='utf-8').strip()
# Each clue is a communicative task in the SAME language, never an identical copy.
clues={
'greetings':[
L('Saluta in modo informale.','Give an informal greeting.','قل تحية غير رسمية.','Поздоровайся неформально.'),
L('Saluta al mattino.','Greet someone in the morning.','قل تحية الصباح.','Поздоровайся утром.'),
L('Ringrazia una persona.','Thank someone.','اشكر شخصًا.','Поблагодари человека.')],
'identity':[
L('Presentati: il tuo nome è Anna.','Introduce yourself: your name is Anna.','قدم نفسك: اسمك آنا.','Представься: тебя зовут Анна.'),
L('Presenta una donna: il suo nome è Maria.','Introduce a woman: her name is Maria.','قدم امرأة: اسمها ماريا.','Представь женщину: её зовут Мария.'),
L('Presenta un uomo: il suo nome è Marco.','Introduce a man: his name is Marco.','قدم رجلًا: اسمه ماركو.','Представь мужчину: его зовут Марко.')],
'objects':[
L('Presenta questo oggetto: un libro.','Identify this object: a book.','عرّف هذا الشيء: كتاب.','Назови этот предмет: книга.'),
L('Presenta questo edificio: una casa.','Identify this building: a house.','عرّف هذا المبنى: بيت.','Назови это здание: дом.'),
L('Presenta questo edificio: una scuola.','Identify this building: a school.','عرّف هذا المبنى: مدرسة.','Назови это здание: школа.')],
'description':[
L('Descrivi il libro: è appena comprato.','Describe the book: it is not old.','صف الكتاب: ليس قديمًا.','Опиши книгу: она не старая.'),
L('Descrivi la casa: non è piccola.','Describe the house: it is not small.','صف البيت: ليس صغيرًا.','Опиши дом: он не маленький.'),
L('Descrivi la porta: non è vecchia.','Describe the door: it is not old.','صف الباب: ليس قديمًا.','Опиши дверь: она не старая.')],
'numbers':[
L('Conta: libro × 1.','Count: book × 1.','عدّ: كتاب × ١.','Посчитай: книга × 1.'),
L('Conta: libro × 2.','Count: book × 2.','عدّ: كتاب × ٢.','Посчитай: книга × 2.'),
L('Conta: libro × 3.','Count: book × 3.','عدّ: كتاب × ٣.','Посчитай: книга × 3.')],
'possession':[
L('Di’ che possiedi un libro.','Say that you own a book.','قل إنك تملك كتابًا.','Скажи, что у тебя есть книга.'),
L('Di’ che una donna possiede una casa.','Say that a woman owns a house.','قل إن امرأة تملك بيتًا.','Скажи, что у женщины есть дом.'),
L('Di’ che un uomo possiede una penna.','Say that a man owns a pen.','قل إن رجلًا يملك قلمًا.','Скажи, что у мужчины есть ручка.')],
'habits':[
L('Racconta: tu + leggere + un libro.','Talk about yourself: read a book.','كوّن جملة عن نفسك: قراءة كتاب.','Скажи о себе: читать книгу.'),
L('Racconta: tu + bere + acqua.','Talk about yourself: drink water.','كوّن جملة عن نفسك: شرب الماء.','Скажи о себе: пить воду.'),
L('Di’ quale lingua parli: inglese.','Name the language you speak: English.','قل إن لغتك التي تتكلمها هي الإنجليزية.','Скажи, на каком языке говоришь: английский.')],
'others':[
L('Racconta: lei + leggere + un libro.','Make a sentence: she + read + a book.','كوّن جملة: هي + قراءة كتاب.','Скажи: она + читать книгу.'),
L('Racconta: lui + bere + tè.','Make a sentence: he + drink + tea.','كوّن جملة: هو + شرب الشاي.','Скажи: он + пить чай.'),
L('Di’ quale lingua parla lei: italiano.','Name the language she speaks: Italian.','قل إن لغتها التي تتكلمها هي الإيطالية.','Скажи, на каком языке она говорит: итальянский.')],
'negative':[
L('Nega: tu + bere + caffè.','Say you do not drink coffee.','انفِ عن نفسك شرب القهوة.','Скажи о себе с отрицанием: пить кофе.'),
L('Nega: tu + parlare + russo.','Say you do not speak Russian.','انفِ عن نفسك التكلم بالروسية.','Скажи о себе с отрицанием: говорить по-русски.'),
L('Nega: tu + leggere.','Say you do not read.','انفِ عن نفسك القراءة.','Скажи о себе с отрицанием: читать.')],
'location':[
L('Dove si trova il libro? Sopra il tavolo.','Where is the book? On the table.','أين الكتاب؟ على سطح الطاولة.','Где книга? На столе.'),
L('Dove si trova il tè? Sopra il tavolo.','Where is the tea? On the table.','أين الشاي؟ على سطح الطاولة.','Где чай? На столе.'),
L('Dove si trova il caffè? Sopra il tavolo.','Where is the coffee? On the table.','أين القهوة؟ على سطح الطاولة.','Где кофе? На столе.')],
'requests':[
L('Chiedi dell’acqua con gentilezza.','Politely ask for water.','اطلب ماءً بأدب.','Вежливо попроси воду.'),
L('Chiedi del tè con gentilezza.','Politely ask for tea.','اطلب شايًا بأدب.','Вежливо попроси чай.'),
L('Chiedi del caffè con gentilezza.','Politely ask for coffee.','اطلب قهوةً بأدب.','Вежливо попроси кофе.')],
'questions':[
L('Chiedi a una persona dove vive.','Ask someone where they live.','اسأل شخصًا عن مكان سكنه.','Спроси человека, где он живёт.'),
L('Chiedi a una persona che cosa sta leggendo.','Ask someone what they read.','اسأل شخصًا عما يقرأ.','Спроси человека, что он читает.'),
L('Chiedi a una persona se conosce l’inglese.','Ask someone if they speak English.','اسأل شخصًا هل يتكلم الإنجليزية.','Спроси человека, говорит ли он по-английски.')],
'plural':[
L('Descrivi più libri: non sono vecchi.','Describe several books: they are not old.','صف عدة كتب: ليست قديمة.','Опиши несколько книг: они не старые.'),
L('Descrivi più case: non sono piccole.','Describe several houses: they are not small.','صف عدة بيوت: ليست صغيرة.','Опиши несколько домов: они не маленькие.'),
L('Descrivi più porte: non sono vecchie.','Describe several doors: they are not old.','صف عدة أبواب: ليست قديمة.','Опиши несколько дверей: они не старые.')],
'past':[
L('Ieri: Anna + leggere + un libro.','Yesterday: Anna + read + a book.','أمس: آنا + قراءة كتاب.','Вчера: Анна + прочитать книгу.'),
L('Ieri: Marco + bere + tè.','Yesterday: Marco + drink + tea.','أمس: ماركو + شرب الشاي.','Вчера: Марко + пить чай.'),
L('Ieri: Anna + scrivere + una lettera.','Yesterday: Anna + write + a letter.','أمس: آنا + كتابة رسالة.','Вчера: Анна + написать письмо.')],
'future':[
L('Domani: tu + leggere + un libro.','Say what you will do tomorrow: read a book.','غدًا: أنت + قراءة كتاب.','Скажи о себе: завтра прочитать книгу.'),
L('Domani: tu + scrivere + una lettera.','Say what you will do tomorrow: write a letter.','غدًا: أنت + كتابة رسالة.','Скажи о себе: завтра написать письмо.'),
L('Domani: tu + andare + a scuola.','Say what you will do tomorrow: go to school.','غدًا: أنت + الذهاب إلى المدرسة.','Скажи о себе: завтра пойти в школу.')],
'ability':[
L('Esprimi capacità: tu + leggere questo libro.','Express ability: you + read this book.','عبّر عن قدرتك على قراءة هذا الكتاب.','Скажи, что можешь прочитать эту книгу.'),
L('Esprimi capacità: lei + aprire la porta.','Express ability: she + open the door.','عبّر عن قدرتها على فتح الباب.','Скажи, что она может открыть дверь.'),
L('Esprimi capacità: noi + aiutare Marco.','Express ability: we + help Marco.','عبّر عن قدرتنا على مساعدة ماركو.','Скажи, что мы можем помочь Марко.')],
'preference':[
L('Esprimi apprezzamento per questo libro.','Say you enjoy this book.','عبّر عن إعجابك بهذا الكتاب.','Скажи, что тебе нравится эта книга.'),
L('Esprimi apprezzamento per questi libri.','Say you enjoy these books.','عبّر عن إعجابك بهذه الكتب.','Скажи, что тебе нравятся эти книги.'),
L('Esprimi apprezzamento per la lettura.','Say you enjoy reading.','عبّر عن إعجابك بالقراءة.','Скажи, что тебе нравится читать.')],
'comparison':[
L('Confronta le case: questa supera l’altra per dimensioni.','Compare houses: this one is larger.','قارن البيوت: هذا أكبر حجمًا.','Сравни дома: этот больше другого.'),
L('Confronta i libri: questo suscita più interesse.','Compare books: this one holds more interest.','قارن الكتب: هذا أكثر إثارة للاهتمام.','Сравни книги: эта интереснее другой.'),
L('Confronta due tè: questo ha qualità superiore.','Compare two teas: this one has higher quality.','قارن نوعين من الشاي: هذا أفضل جودة.','Сравни два вида чая: этот лучше другого.')],
'reasons':[
L('Unisci causa e azione: leggere + piacere.','Join action and reason: read + enjoy it.','اربط الفعل بالسبب: القراءة + حب القراءة.','Соедини действие и причину: читать + нравится.'),
L('Unisci causa e azione: bere acqua + avere sete.','Join action and reason: drink water + be thirsty.','اربط الفعل بالسبب: شرب الماء + العطش.','Соедини действие и причину: пить воду + хотеть пить.'),
L('Unisci causa e azione: studiare + voler imparare.','Join action and reason: study + want to learn.','اربط الفعل بالسبب: الدراسة + الرغبة في التعلم.','Соедини действие и причину: учиться + хотеть научиться.')],
'pronouns':[
L('Sostituisci “il libro” con un pronome: io leggo il libro.','Replace “the book” with a pronoun: I read the book.','استبدل الكتاب بضمير: أنا أقرأ الكتاب.','Замени книгу местоимением: я читаю книгу.'),
L('Sostituisci “la porta” con un pronome: lei apre la porta.','Replace “the door” with a pronoun: she opens the door.','استبدل الباب بضمير: هي تفتح الباب.','Замени дверь местоимением: она открывает дверь.'),
L('Sostituisci “i libri” con un pronome: noi compriamo i libri.','Replace “the books” with a pronoun: we buy the books.','استبدل الكتب بضمير: نحن نشتري الكتب.','Замени книги местоимением: мы покупаем книги.')],
'relative':[
L('Unisci: questo è il libro + io leggo il libro.','Join: this is the book + I read the book.','اربط: هذا هو الكتاب + أنا أقرأ الكتاب.','Соедини: это книга + я читаю книгу.'),
L('Unisci: questa è la casa + io vedo la casa.','Join: this is the house + I see the house.','اربط: هذا هو البيت + أنا أرى البيت.','Соедини: это дом + я вижу дом.'),
L('Unisci: questa è la porta + io apro la porta.','Join: this is the door + I open the door.','اربط: هذا هو الباب + أنا أفتح الباب.','Соедини: это дверь + я открываю дверь.')],
'conditions':[
L('Unisci condizione e azione: avere tempo → leggere.','Join condition and action: have time → read.','اربط الشرط بالفعل: وجود وقت ← القراءة.','Соедини условие и действие: есть время → читать.'),
L('Unisci condizione e azione: avere sete → bere acqua.','Join condition and action: be thirsty → drink water.','اربط الشرط بالفعل: العطش ← شرب الماء.','Соедини условие и действие: хочется пить → пить воду.'),
L('Unisci condizione e azione: pioggia → restare a casa.','Join condition and action: rain → stay at home.','اربط الشرط بالفعل: المطر ← البقاء في البيت.','Соедини условие и действие: дождь → остаться дома.')],
'experience':[
L('L’azione è già conclusa: Anna + leggere questo libro.','The action is already complete: Anna + read this book.','الفعل تم بالفعل: آنا + قراءة هذا الكتاب.','Действие уже завершено: Анна + прочитать эту книгу.'),
L('L’azione è già conclusa: Marco + scrivere la lettera.','The action is already complete: Marco + write the letter.','الفعل تم بالفعل: ماركو + كتابة الرسالة.','Действие уже завершено: Марко + написать письмо.'),
L('L’azione è già conclusa: Anna + aprire la porta.','The action is already complete: Anna + open the door.','الفعل تم بالفعل: آنا + فتح الباب.','Действие уже завершено: Анна + открыть дверь.')],
'wishes':[
L('Esprimi il desiderio che una persona venga da te.','Express a wish for someone to come.','عبّر عن رغبتك في أن يأتي شخص إليك.','Скажи, что хочешь, чтобы человек пришёл.'),
L('Esprimi il desiderio che lei legga questo libro.','Express a wish for her to read this book.','عبّر عن رغبتك في أن تقرأ هي هذا الكتاب.','Скажи, что хочешь, чтобы она прочитала эту книгу.'),
L('Esprimi il desiderio che lui apra la porta.','Express a wish for him to open the door.','عبّر عن رغبتك في أن يفتح هو الباب.','Скажи, что хочешь, чтобы он открыл дверь.')],
}
for unit in course['units']:
 for id,clue in zip(unit['items'],clues[unit['id']]):next(i for i in course['items'] if i['id']==id)['clue']=clue
vocab_clues=[L('Risposta affermativa.','An affirmative answer.','جواب بالموافقة.','Утвердительный ответ.'),L('Risposta negativa.','A negative answer.','جواب بالنفي.','Отрицательный ответ.'),L('Espressione per chiedere con gentilezza.','A word for a polite request.','تعبير للطلب بأدب.','Слово для вежливой просьбы.'),L('Pronome: la persona che parla.','Pronoun: the speaker.','ضمير المتكلم المفرد.','Местоимение: говорящий.'),L('Pronome: una donna di cui parli.','Pronoun: a woman you talk about.','ضمير الغائبة المفردة.','Местоимение: женщина, о которой говоришь.'),L('Pronome: un uomo di cui parli.','Pronoun: a man you talk about.','ضمير الغائب المفرد.','Местоимение: мужчина, о котором говоришь.')]
for item,clue in zip(course['vocab'],vocab_clues):item['clue']=clue
(R/'data/course.json').write_text(json.dumps(course,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')

names={
'it':['a','bi','ci','di','e','effe','gi','acca','i','elle','emme','enne','o','pi','cu','erre','esse','ti','u','vi','zeta'],
'en':['ay','bee','cee','dee','ee','eff','gee','aitch','eye','jay','kay','ell','em','en','oh','pee','cue','ar','ess','tee','you','vee','double you','ex','why','zee / zed'],
'ru':['а','бэ','вэ','гэ','дэ','е','ё','жэ','зэ','и','и краткое','ка','эль','эм','эн','о','пэ','эр','эс','тэ','у','эф','ха','цэ','че','ша','ща','твёрдый знак','ы','мягкий знак','э','ю','я'],
'ar':['ألف','باء','تاء','ثاء','جيم','حاء','خاء','دال','ذال','راء','زاي','سين','شين','صاد','ضاد','طاء','ظاء','عين','غين','فاء','قاف','كاف','لام','ميم','نون','هاء','واو','ياء']}
alphabets={'it':'ABCDEFGHILMNOPQRSTUVZ','en':'ABCDEFGHIJKLMNOPQRSTUVWXYZ','ru':'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ','ar':'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'}
lesson_names=L('Lettere','Letters','الحروف','Буквы')
letter_notes=L('Prima riconosci il segno e il nome della lettera; poi scrivilo senza modello. Il nome di una lettera non è sempre il suo suono dentro una parola.','First identify the symbol and its letter name; then type it without the model. A letter name is not always its sound in a word.','تعرف أولًا على شكل الحرف واسمه، ثم اكتبه دون نموذج. اسم الحرف ليس دائمًا صوته داخل الكلمة.','Сначала узнай знак и название буквы, затем напиши её без образца. Название буквы не всегда совпадает с её звуком в слове.')
catalog={lang:{'direction':'rtl' if lang=='ar' else 'ltr','letters':[],'lessons':[]} for lang in langs}
def add(lang,id,title,note,rows,stage='patterns'):
 cards=[]
 for i,row in enumerate(rows):
  cue,model,*extra=row
  card={'id':f'{lang}_{id}_{i}','cue':cue,'model':model,'speech':model,'answers':[model],'kind':stage}
  if extra:card.update(extra[0])
  cards.append(card)
 catalog[lang]['lessons'].append({'id':id,'title':title,'note':note,'stage':stage,'cards':cards})
for lang,letters in alphabets.items():
 for i,(letter,name) in enumerate(zip(letters,names[lang])):
  row={'symbol':letter,'lower':letter.lower(),'name':name}
  if lang=='ar':
   joins=letter not in 'ادذرزو';row['forms']=[letter,letter+'ـ' if joins else None,'ـ'+letter+'ـ' if joins else None,'ـ'+letter];row['joinsLeft']=joins
  catalog[lang]['letters'].append(row)
 for group,start in enumerate(range(0,len(letters),6)):
  title={l:f'{lesson_names[l]} {group+1} · '+letters[start:start+6] for l in langs}
  rows=[(row['name'],row['lower'],{'upper':row['symbol'],'speech':row['name'].split(' / ')[0]}) for row in catalog[lang]['letters'][start:start+6]]
  add(lang,f'letters_{group+1}',title,letter_notes,rows,'letters')

add('it','foreign',L('Le cinque lettere dei prestiti','Five letters in loanwords','خمسة حروف في الكلمات الدخيلة','Пять букв в заимствованиях'),L('L’alfabeto tradizionale ha 21 lettere. J, K, W, X e Y si incontrano anche in nomi, sigle e prestiti: fanno parte della lettura quotidiana.','The traditional alphabet has 21 letters. J, K, W, X and Y also occur in names, abbreviations and loanwords.','تحتوي الأبجدية التقليدية على ٢١ حرفًا. تظهر J وK وW وX وY أيضًا في الأسماء والاختصارات والكلمات الدخيلة.','В традиционном алфавите 21 буква. J, K, W, X, Y встречаются в именах, сокращениях и заимствованиях.'),[(a,b,{'speech':a}) for a,b in zip(['i lunga','cappa','doppia vu','ics','ipsilon'],'jkwxy')])
add('it','accents',L('Accenti che cambiano la parola','Accents that change a word','النبرات التي تميز الكلمات','Акценты, меняющие слово'),L('Mantieni gli accenti: e ≠ è, si ≠ sì. In perché si usa é; in caffè si usa è. Non sostituire l’accento con un apostrofo.','Keep accents: e ≠ è, si ≠ sì. Perché uses é; caffè uses è. An apostrophe is not an accent.','حافظ على النبرات: e ليست è وsi ليست sì. في perché نكتب é وفي caffè نكتب è. الفاصلة العليا ليست نبرة.','Сохраняй акценты: e ≠ è, si ≠ sì. В perché пишется é, в caffè — è. Апостроф не заменяет акцент.'),[('Lui ___ Marco. (essere)','è'),('Una risposta affermativa','sì'),('La bevanda: caf…','caffè'),('La domanda sulla causa: per…','perché'),('La bevanda: t…','tè'),('Un periodo della giornata: luned…','lunedì')])
add('it','hard_soft',L('C, G e H nel contesto','C, G and H in context','C وG وH في السياق','C, G и H в контексте'),L('C e G cambiano davanti a e/i; ch e gh mantengono i suoni duri. H non ha un suono autonomo. Leggi la parola intera: casa/cena, gatto/gelo, chi/che e ghiro.','C and G change before e/i; ch and gh preserve hard sounds. H has no sound of its own. Compare whole words.','تتغير C وG قبل e وi، ويحافظ ch وgh على النطق الصلب. ليس لـH صوت مستقل. اقرأ الكلمة كاملة.','Перед e/i C и G меняют звучание; ch и gh сохраняют твёрдые звуки. H не имеет отдельного звука. Читай целое слово.'),[('c + a + s + a','casa'),('c + e + n + a','cena'),('c + h + i','chi'),('c + h + e','che'),('g + a + t + t + o','gatto'),('g + h + i + r + o','ghiro')])
add('it','groups',L('Gruppi di lettere','Letter groups','مجموعات الحروف','Сочетания букв'),L('Gn, gli, sc e sch vanno letti nel contesto: gn in gnomo; gli in figlio; sci in sciarpa; sc in scuola; sch in scheda. Non ogni sequenza gli ha lo stesso suono: confronta glicine.','Read gn, gli, sc and sch in context: gnomo, figlio, sciarpa, scuola. Gli is not always the same sound: compare glicine.','اقرأ gn وgli وsc وsch في سياق الكلمة: gnomo وfiglio وsciarpa وscuola. لا تنطق gli دائمًا بالطريقة نفسها؛ قارن glicine.','Читай gn, gli, sc, sch в контексте: gnomo, figlio, sciarpa, scuola. Gli звучит не всегда одинаково: сравни glicine.'),[('g + n + o + m + o','gnomo'),('f + i + g + l + i + o','figlio'),('s + c + i + a + r + p + a','sciarpa'),('s + c + u + o + l + a','scuola'),('s + c + h + e + d + a','scheda'),('g + l + i + c + i + n + e','glicine')])
add('it','doubles',L('Doppie e apostrofo','Double letters and apostrophes','الحروف المضعفة والفاصلة العليا','Двойные буквы и апостроф'),L('Una consonante doppia può distinguere due parole: pala/palla, nono/nonno. L’apostrofo segnala un’elisione come l’acqua; è distinto dall’accento.','Double consonants can distinguish words: pala/palla, nono/nonno. The apostrophe in l’acqua marks elision, not stress.','قد يميز تضعيف الحرف كلمتين: pala وpalla، nono وnonno. الفاصلة العليا في l’acqua تدل على حذف حركة وليست نبرة.','Двойные согласные различают слова: pala/palla, nono/nonno. Апостроф в l’acqua обозначает элизию, а не ударение.'),[('p + a + l + a','pala'),('p + a + l + l + a','palla'),('n + o + n + o','nono'),('n + o + n + n + o','nonno'),('la + acqua: con elisione',"l’acqua",{'answers':['l’acqua',"l'acqua"]})])
add('en','short_vowels',L('Vocali brevi nelle parole','Short vowels in words','الحركات القصيرة داخل الكلمات','Краткие гласные в словах'),L('Distingui il nome della lettera dal suono. Esempi: a in cat /æ/, e in bed /e/, i in sit /ɪ/, o in hot (varia con l’accento), u in cup /ʌ/. Gli esempi non valgono per ogni parola.','Separate letter names from sounds: cat /æ/, bed /e/, sit /ɪ/, hot (varies by accent), cup /ʌ/. These examples are not rules for every word.','ميز اسم الحرف عن صوته: cat /æ/ وbed /e/ وsit /ɪ/ وhot الذي يختلف حسب اللهجة وcup /ʌ/. هذه الأمثلة لا تنطبق على كل كلمة.','Различай название буквы и звук: cat /æ/, bed /e/, sit /ɪ/, hot (зависит от акцента), cup /ʌ/. Это не правила для каждого слова.'),[('c + a + t','cat'),('b + e + d','bed'),('s + i + t','sit'),('h + o + t','hot'),('c + u + p','cup')])
add('en','vowel_patterns',L('Vocali lunghe e gruppi vocalici','Long vowels and vowel teams','الحركات الطويلة ومجموعات الحركات','Долгие гласные и сочетания'),L('Confronta cap/cape e kit/kite. La e finale può cambiare la vocale; ee in see, ai in rain e oa in boat sono altri schemi frequenti. Restano eccezioni, come have.','Compare cap/cape and kit/kite. Final e can change the vowel; see, rain and boat show common vowel teams. Exceptions include have.','قارن cap وcape، kit وkite. قد تغير e الأخيرة صوت الحركة. تظهر مجموعات شائعة في see وrain وboat، لكن توجد استثناءات مثل have.','Сравни cap/cape и kit/kite. Конечная e может менять гласную; see, rain, boat показывают частые сочетания. Есть исключения, например have.'),[('c + a + p','cap'),('c + a + p + e','cape'),('k + i + t + e','kite'),('s + e + e','see'),('r + a + i + n','rain'),('b + o + a + t','boat')])
add('en','consonant_groups',L('Gruppi consonantici','Consonant groups','مجموعات الحروف الساكنة','Сочетания согласных'),L('Sh in ship, ch in chair e th in think/the non sono singoli nomi di lettere. Th ha più di un suono. Confronta anche kn in know e wr in write: la prima lettera è muta.','Sh in ship, ch in chair and th in think/the are not letter names. Th has more than one sound. The first letter is silent in know and write.','ليست sh في ship وch في chair وth في think وthe أسماء حروف. لـth أكثر من صوت. الحرف الأول صامت في know وwrite.','Sh в ship, ch в chair и th в think/the — не названия букв. У th больше одного звука. В know и write первая буква не произносится.'),[('s + h + i + p','ship'),('c + h + a + i + r','chair'),('t + h + i + n + k','think'),('t + h + e','the'),('k + n + o + w','know'),('w + r + i + t + e','write')])
add('en','exceptions',L('Parole da imparare nel contesto','Words to learn in context','كلمات تُتعلم في السياق','Слова, изучаемые в контексте'),L('One e two non si decodificano con una sola regola. Read ha la stessa grafia al presente e al passato, ma cambia pronuncia. Per questi casi ascolta la frase intera, non una lettera isolata.','One and two do not follow one simple spelling rule. Present and past read have the same spelling but different pronunciations. Listen to the whole sentence.','لا تتبع one وtwo قاعدة هجائية واحدة بسيطة. تتطابق كتابة read في المضارع والماضي لكن يختلف النطق. استمع إلى الجملة كاملة.','One и two не читаются по одному простому правилу. Read в настоящем и прошлом пишется одинаково, но звучит по-разному. Слушай целую фразу.'),[('1 → English','one'),('2 → English','two'),('3 → English','three'),('r + e + a + d','read'),('h + a + v + e','have')])
add('ru','lookalikes',L('Cirillico: somiglianze ingannevoli','Cyrillic lookalikes','التشابه المضلل في السيريلية','Похожие буквы разных алфавитов'),L('В, Н, Р, С, У e Х sono cirilliche: non si leggono come le lettere latine somiglianti. Digita in cirillico; una a latina non è una а cirillica.','В, Н, Р, С, У and Х are Cyrillic, not their Latin lookalikes. Use a Cyrillic keyboard: Latin a is not Cyrillic а.','الحروف В وН وР وС وУ وХ سيريلية ولا تقرأ مثل أشباهها اللاتينية. استخدم لوحة سيريلية؛ a اللاتينية ليست а السيريلية.','В, Н, Р, С, У, Х — кириллические буквы. Не путай их с латинскими. Латинская a и кириллическая а — разные символы.'),[('вэ','в'),('эн','н'),('эр','р'),('эс','с'),('у','у'),('ха','х')])
add('ru','vowels',L('Vocali e consonanti morbide','Vowels and soft consonants','الحركات والصوامت اللينة','Гласные и мягкие согласные'),L('Distingui и/й, е/ё e и/ы. Е, ё, ю, я e и possono segnalare la morbidezza della consonante precedente; non è una regola senza eccezioni. Ё e е restano distinte negli esercizi.','Distinguish и/й, е/ё and и/ы. Е, ё, ю, я and и can mark a preceding consonant as soft, with exceptions. Keep ё distinct from е.','ميز и عن й وе عن ё وи عن ы. قد تشير е وё وю وя وи إلى لين الصامت السابق، مع وجود استثناءات. نحافظ على الفرق بين ё وе.','Различай и/й, е/ё, и/ы. Е, ё, ю, я, и могут обозначать мягкость предыдущего согласного, но есть исключения. В упражнениях ё не заменяется на е.'),[('и','и',{'distractors':['й','ы','е']}),('и краткое','й'),('ё','ё'),('ы','ы'),('ю','ю'),('я','я')])
add('ru','signs',L('Segno morbido e segno duro','Soft sign and hard sign','علامة اللين والعلامة الصلبة','Мягкий и твёрдый знаки'),L('Ь e Ъ non hanno un suono autonomo. Ь può segnalare morbidezza o separazione; Ъ separa prima di una vocale iotizzata. Confronta день, семья e подъезд.','Ь and Ъ have no sound of their own. Ь can mark softness or separation; Ъ separates before an iotated vowel. Compare день, семья and подъезд.','ليس لـЬ وЪ صوت مستقل. قد تشير Ь إلى اللين أو الفصل، وتفصل Ъ قبل حركة يوتية. قارن день وсемья وподъезд.','Ь и Ъ не имеют отдельного звука. Ь может обозначать мягкость или разделение; Ъ разделяет перед йотированной гласной. Сравни день, семья, подъезд.'),[('мягкий знак','ь'),('твёрдый знак','ъ'),('д + е + н + ь','день'),('с + е + м + ь + я','семья'),('п + о + д + ъ + е + з + д','подъезд')])
add('ru','stress',L('Accento e lettura delle parole','Stress and reading words','النبر وقراءة الكلمات','Ударение и чтение слов'),L('L’accento russo non è prevedibile dalla sola grafia. Nei modelli didattici può essere segnato: вода́, молоко́, кни́га. Qui conserva il segno quando è richiesto; nelle frasi normali è spesso omesso. Il corsivo manoscritto richiede un lavoro ulteriore, non viene valutato dalla tastiera.','Russian stress is not predictable from spelling alone. Learning models can mark it: вода́, молоко́, кни́га. Keep a requested mark; ordinary text usually omits it. Typed exercises do not assess handwritten cursive.','لا يمكن استنتاج النبر الروسي من الكتابة وحدها. قد يظهر في النماذج التعليمية: вода́ وмолоко́ وкни́га. احتفظ بالعلامة عند طلبها. الكتابة بلوحة المفاتيح لا تقيم الخط اليدوي.','Ударение не всегда предсказуемо по написанию. В учебных моделях его отмечают: вода́, молоко́, кни́га. Сохраняй знак по заданию; в обычном тексте его часто нет. Печатный ввод не оценивает рукописный курсив.'),[('вода + ударение на а','вода́'),('молоко + ударение на последнее о','молоко́'),('книга + ударение на и','кни́га'),('м + а + м + а','мама')])
for form,label in [(1,L('Inizio','Initial','أول الكلمة','Начало')),(2,L('Centro','Medial','وسط الكلمة','Середина')),(3,L('Fine','Final','آخر الكلمة','Конец'))]:
 rows=[(row['forms'][form],row['symbol'],{'speech':row['name']}) for row in catalog['ar']['letters'] if row['forms'][form]]
 add('ar',f'forms_{form}',L('Forme collegate: '+label['it'],'Joined forms: '+label['en'],'الأشكال المتصلة: '+label['ar'],'Соединённые формы: '+label['ru']),L('Leggi da destra a sinistra. Riconosci la lettera nella forma mostrata e digita la sua forma di base. Le forme vengono disegnate dal font, non sono alfabeti diversi.','Read right to left. Identify the joined letter and type its base form. The font draws contextual shapes; these are not different alphabets.','اقرأ من اليمين إلى اليسار. تعرف على الحرف في الشكل المعروض واكتب صورته الأساسية. يرسم الخط الأشكال حسب السياق؛ ليست أبجديات مختلفة.','Читай справа налево. Узнай соединённую букву и введи её основную форму. Шрифт отображает контекстные формы; это не разные алфавиты.'),rows,'forms')
add('ar','breaks',L('Le sei lettere che interrompono il legame','Six letters that break the join','ستة حروف لا تتصل بما بعدها','Шесть букв, прерывающих соединение'),L('ا د ذ ر ز و si collegano alla lettera precedente, quando possibile, ma non alla successiva nella direzione di scrittura. ء è separata. Non aggiungere un collegamento inventato.','ا د ذ ر ز و can join the preceding letter but do not join the following letter in writing order. ء stands separately. Do not invent joins.','تتصل ا د ذ ر ز و بما قبلها عندما يكون الاتصال ممكنًا، ولا تتصل بما بعدها. ء منفصلة. لا تضف اتصالًا غير صحيح.','ا د ذ ر ز و могут соединяться с предыдущей буквой, но не со следующей по направлению письма. ء стоит отдельно. Не придумывай соединения.'),[(r['name'],r['symbol']) for r in catalog['ar']['letters'] if not r['joinsLeft']])
add('ar','short_vowels',L('Vocali brevi e assenza di vocale','Short vowels and no vowel','الحركات القصيرة والسكون','Краткие гласные и отсутствие гласной'),L('Fatha َ, kasra ِ e damma ُ distinguono ba/bi/bu. Sukun ْ indica assenza di vocale. Questi segni devono essere conservati negli esercizi che li valutano.','Fatha َ, kasra ِ and damma ُ distinguish ba/bi/bu. Sukun ْ marks no vowel. Keep these marks in the exercises that assess them.','تميّز الفتحة والكسرة والضمة بَ وبِ وبُ. يدل السكون على غياب الحركة. حافظ على هذه العلامات في التمارين التي تختبرها.','Фатха َ, касра ِ, дамма ُ различают ba/bi/bu. Сукун ْ отмечает отсутствие гласной. В этих упражнениях знаки сохраняются.'),[('باء مع فتحة','بَ',{'distractors':['بِ','بُ','بْ']}),('باء مع كسرة','بِ'),('باء مع ضمة','بُ'),('باء مع سكون','بْ')])
add('ar','length',L('Vocali lunghe, shadda e tanwin','Long vowels, shadda and tanwin','المد والشدة والتنوين','Долгие гласные, шадда и танвин'),L('Confronta بَ/بَا, بِ/بِي, بُ/بُو. Shadda ّ raddoppia la consonante; tanwin aggiunge una terminazione con n in contesti vocalizzati. Non confondere segni combinati e nuove lettere.','Compare بَ/بَا, بِ/بِي, بُ/بُو. Shadda doubles the consonant; tanwin adds an n ending in vocalized contexts. Combining marks are not new letters.','قارن بَ وبَا، بِ وبِي، بُ وبُو. تدل الشدة على تضعيف الصامت ويضيف التنوين صوت ن في السياقات المشكولة. العلامات المركبة ليست حروفًا جديدة.','Сравни بَ/بَا, بِ/بِي, بُ/بُو. Шадда удваивает согласный; танвин добавляет окончание с n в огласованных контекстах. Знаки не являются новыми буквами.'),[('باء مع مد بالألف','بَا'),('باء مع مد بالياء','بِي'),('باء مع مد بالواو','بُو'),('باء مشددة مفتوحة','بَّ'),('باء مع تنوين الضم','بٌ'),('باء مع تنوين الكسر','بٍ')])
add('ar','variants',L('Hamza e segni distinti','Hamza and distinct signs','الهمزة والأشكال المتميزة','Хамза и разные знаки'),L('Distingui ء أ إ آ ؤ ئ; ة non è ه, e ى non è ي. لا combina ل e ا. Qui impari a riconoscerli: le regole complete di ortografia della hamza richiedono altri livelli.','Distinguish ء أ إ آ ؤ ئ; ة is not ه, and ى is not ي. لا combines ل and ا. This is recognition practice; full hamza spelling rules require further levels.','ميز ء وأ وإ وآ وؤ وئ. ة ليست ه وى ليست ي. تتكون لا من ل وا. هذا تدريب على التعرف؛ تحتاج قواعد كتابة الهمزة الكاملة إلى مستويات أخرى.','Различай ء أ إ آ ؤ ئ; ة не ه, ى не ي. لا объединяет ل и ا. Здесь изучается распознавание; полные правила написания хамзы требуют следующих уровней.'),[('همزة منفصلة','ء'),('همزة فوق الألف','أ'),('همزة تحت الألف','إ'),('ألف مع مدّة','آ'),('همزة على واو','ؤ'),('همزة على ياء','ئ'),('تاء مربوطة','ة'),('ألف مقصورة','ى'),('لام وألف','لا')])
add('ar','reading',L('Dai segni alle parole','From signs to words','من العلامات إلى الكلمات','От знаков к словам'),L('Inizia con parole vocalizzate, poi passa agli esempi senza vocali brevi. I punti distinguono lettere come ب/ت/ث e ج/ح/خ. La tastiera controlla i caratteri, non il tratto manoscritto. Numeri e testo latino restano isolati visivamente dentro l’interfaccia RTL.','Start with vocalized words, then read examples without short vowels. Dots distinguish ب/ت/ث and ج/ح/خ. Typing checks characters, not handwriting. Numbers and Latin text are visually isolated in RTL layouts.','ابدأ بكلمات مشكولة ثم اقرأ أمثلة دون حركات قصيرة. تميز النقاط ب وت وث، وج وح وخ. يقيم الإدخال الحروف لا الخط اليدوي. تُعزل الأرقام والنصوص اللاتينية بصريًا في الواجهة من اليمين إلى اليسار.','Начни с огласованных слов, затем переходи к примерам без кратких гласных. Точки различают ب/ت/ث и ج/ح/خ. Проверяется ввод символов, а не почерк. Числа и латинский текст изолированы в интерфейсе RTL.'),[('كَ + تَ + بَ','كَتَبَ'),('كِ + تَا + ب','كِتَاب'),('بَ + ا + ب','بَاب'),('بَ + يْ + ت','بَيْت'),('حرف بثلاث نقاط فوقه','ث'),('حرف بنقطة تحته','ب')])
# A bridge uses existing embedded phrase recordings whenever they exist.
for lang in langs:
 rows=[]
 for id in course['units'][0]['items']:
  item=next(i for i in course['items'] if i['id']==id)
  rows.append((item['clue'][lang],item['text'][lang],{'speech':item['speech'][lang],'context':id,'answers':item['accepted'][lang]}))
 add(lang,'first_words',L('Le prime frasi','First phrases','الجمل الأولى','Первые фразы'),L('Porta le lettere nella lettura di frasi brevi. Prima riconosci, poi scrivi e infine ascolta quando l’audio è disponibile.','Use letters to read short phrases. First recognize, then type, then listen when audio is available.','استخدم الحروف لقراءة جمل قصيرة. تعرف عليها ثم اكتبها ثم استمع عندما يتوفر الصوت.','Применяй буквы для чтения коротких фраз. Сначала узнай, затем напиши и послушай, когда доступно аудио.'),rows,'phrases')
(R/'data/alphabet.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
print('Lessons',sum(len(c['lessons']) for c in catalog.values()),'cards',sum(len(l['cards']) for c in catalog.values() for l in c['lessons']))
