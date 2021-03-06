import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentassessmentreport',
  templateUrl: './studentassessmentreport.component.html',
  styleUrls: ['./studentassessmentreport.component.css']
})
export class StudentassessmentreportComponent implements OnInit {

 
  questions: any;
  // data: any;
  // sample: any;
  constructor() { }

  ngOnInit() {
  // this.getJson();
    this. questions=[
      { label: "பொதுவாக முழுமைபெறா பதிவேடுகளின் கணக்குகளில் ___________கணக்குகள் மட்டும் முழுமையாக பராமரிக்கப்படுகின்றன. ", correct_answer: "சொத்துக் கணக்குகள்", given_answer: "பெறுதற்குரிய மாற்றுச்சீட்டு"},
    { label: "முழுமைபெறா பதிவேடுகள் தொடர்பான கீழ்க்கண்டவற்றில் எந்த வாக்கியம் சரி?", correct_answer:"பெயரளவுக் கணக்குகள்", given_answer: "செலுத்துதற்குரிய மாற்றுச்சீட்டு"},
    { label: "நிலை அறிக்கை …….. கண்டறிய தயாரிக்கப்படுகிறது.", correct_answer:"நிலைச் சொத்து கணக்குகள்", given_answer: "மொத்த கடனாளிகள" },
    { label: "சரிக்கட்டப்பட்ட இறுதிமுதலுக்கும், தொடக்க முதலுக்கும் உள்ள வேறுபாடு சாதகமாக இருந்தால் - ஆகும்", correct_answer:"நிலைச் சொத்து கணக்குகள்", given_answer: "மொத்த கடனீந்தோர்கள"},
    { label: "மொத்தக் கடனாளிகள் கணக்கு _____ கண்டறிய தயாரிக்கப்படுகிறது.", correct_answer:"ரொக்க மற்றும் ஆள்சார் கணக்குகள்" , given_answer: "நிலை அறிக்கை"},
    { label: "முழுமை பெறா பதிவேடுகளில் சரிக்கட்டப்பட்ட இறுதிமுதல்= ______", correct_answer:"இது அணைத்து வகையான அமைப்புகளுக்கும் பொருந்தும்", given_answer: "இலாப நட்ட அறிக்கை" },
    { label: "பின்வருவனவற்றில் சரியானவற்றை கண்டுபிடி", correct_answer:"இருப்பாய்வு தயாரிக்க முடியாது", given_answer: "இரண்டும"},
    { label: "______ மொத்தக் கடனாளிகள் கணக்கில் பதியப்படுவதில்லை", correct_answer:"வரி விதிக்கும் அதிகாரிகளால் ஏற்றுக்கொள்ளப்படும்" , given_answer: "இவற்றில் எதுவுமில்லை"},
    { label: "கடனீந்தோரின் தொடக்க இருப்பு ரூ. 40,000, செலுத்திய ரொக்கம் ரூ. 20, 000, கடன் கொள்முதல் ரூ. 45, 000, கடனீந்தோரின் இறுதி இருப்பு _____", correct_answer:"வியாபார மற்றும் இலாநட்டக் கணக்கு தயாரிக்கப்படும்" , given_answer: "நிலை அறிக்கை" } ,
    { label: "ஒரு வணிகரின் முதல் தொகை ரூ.1,50,000, பொறுப்புகள் ரூ.62000 மாக இருக்கும்பொழுது அவரின் சொத்து மதிப்பு -------", correct_answer:"முதல்", given_answer: "இலாப நட்ட அறிக்கை"},
    { label: "முழுமை பெறா பதிவேடுகளை பொதுவாக பராமரித்து வருவது", correct_answer:"இலாபம்" , given_answer: "நினைவு வியாபர கணக்கு"},
    { label: "பின்வருவனவற்றில் முழுமை பெறா பதிவேடுகளில் எந்த கணக்கு பராமரிக்கப்படுகிறது", correct_answer:"கடனாளிகள்", given_answer: "இவற்றில் எதுவுமில்லை"},
    { label: "தொடக்க நிலை அறிக்கை தயாரிப்பதின் நோக்கம் ----", correct_answer:"கடனீந்தோர்" , given_answer: "பெறுதற்குரிய மாற்றுச்சீட்டு"},
    { label: "பொறுப்புகள் மற்றும் சொத்துக்களின் மதிப்பு முறையே ரூ.50000 மற்றும் ரூ.78000. இதில் வேறுபாட்டு மதிப்பு உணர்த்துவது -----", correct_answer:"நட்டம்", given_answer: "செலுத்துதற்குரிய மாற்றுச்சீட்டு"},
    { label: "இலாபத்தை கண்டறிய, எடுப்பு எதனுடன் கூட்டப்படுகிறது ----", correct_answer:"வருமானம்", given_answer: "மொத்த கடனாளிகள"},
    { label: "எந்த கணக்கு முறையில் பதிவுகளின் கணக்கீட்டு சரி தன்மையை சோதித்து பார்க்க இருப்பாய்வு தயாரிப்பது கடினம்", correct_answer:"ரொக்க விற்பனை", given_answer: "மொத்த கடனீந்தோர்கள"},
    { label: "முழுமை பெறா பதிவேடுகள் தொடர்பான கீழ்க்கண்ட எந்த வாக்கியம் சரியானது அல்ல?", correct_answer:"கடன் விற்பனை" , given_answer: "கடனீந்தோர்கள"},
    { label: "தொடக்க கடனாளிகளின் இருப்பு ரூ.15000, பெற்ற ரொக்கம் ரூ.50000, கடன் விற்பனை ரூ.45000, இறுதி கடனாளிகளின் இருப்பு ரூ.---", correct_answer:"ரொக்க கொள்முதல்", given_answer: "கடனாளிகள"},
    { label: "பொறுப்புகளை காட்டிலும் சொத்துக்கள் அதிகமாக இருந்தால்", correct_answer:"இறுதிமுதல் - எடுப்பு - கூடுதல் முதல்", given_answer: "பெறுதற்குரிய மாற்றுச்சீட்டு"},
    { label: "பின்வருவனவற்றை பொருத்துக அ) நிலை அறிக்கை (தொடக்கம்) - 1. இறுதி முதல் ஆ) நிலை அறிக்கை (இறுதி) - 2.தொடக்க முதல்இ) முதல் தொகை அதிகரித்தால் - 3.நட்டம் ஈ) முதல் தொகை குறைந்தால் - 4. இலாபம்", correct_answer:"இறுதிமுதல் + எடுப்பு - கூடுதல் முதல்", given_answer: "செலுத்தற்குரிய மாற்றுச்சீட்டு" },
    { label: "கடன் கொள்முதலை கண்டுபிடிக்க எந்த கணக்கை தயாரிக்க வேண்டும்?", correct_answer:"கடன் கொள்முதல்", given_answer: "தொடக்க முதல" },
    { label: "கடன் விற்பனையை கண்டுபிடிக்க எந்த கணக்கை தயாரிக்க வேண்டும்?", correct_answer:"இறுதிமுதல் - எடுப்பு - கூடுதல் முதல", given_answer: "இறுதி முதல" },
    { label: "அவமதிக்கப்பட்ட பெறுதற்குரிய மாற்றுச்சீட்டை எந்த கணக்கீல் பற்று வைக்க வேண்டும்?", correct_answer:"இறுதிமுதல் + எடுப்பு - கூடுதல் முதல", given_answer: "நட்டம" },
    { label: "புதிய மாற்றுச்சீட்டுகளை பெற்றால் எந்த தொகையை வரவு வைக்கவேண்டும்?", correct_answer:"தொடக்க முதல் + எடுப்பு - கூடுதல் முதல", given_answer: "இவற்றில் எதுவுமில்லை"},
    { label: "முழுமை பெறா பதிவேடுகளின் கீழ், முதல் கண்டறிய ----- கணக்கை தயாரிக்க வேண்டும்", correct_answer:"தொடக்க முதல் - எடுப்பு - கூடுதல் முதல", given_answer: "நட்டம் மற்றும் எடுப்புகள"},
    { label: "முழுமை பெறா பதிவேடுகளின் கீழ், ---- கணக்கு தயாரிப்பதன் மூலம் சரக்கின் மதிப்பை தீர்மானிக்க முடியும்.", correct_answer:"முதல் = சொத்துக்கள் - பொறுப்புகள", given_answer: "இலாபம் மற்றும் எடுப்புகள"},
    { label: "………. கணக்கை தயாரிப்பதன் மூலம் நடப்பு ஆண்டில் பெற்ற மாற்றுச்சீட்டின் தொகையினை கண்டறியலாம்", correct_answer:"சொத்துக்கள் = முதல் - பொறுப்புகள", given_answer: "இலாபம் மட்டும" },
    { label: "முந்தைய ஆண்டில் குறைத்து எழுதப்பட்ட வராகடன் தற்போழுது வசூலானால் …… கணக்கில் பதியக் கூடாது.", correct_answer:"பொறுப்புகள் = சொத்துக்கள் + முதல", given_answer: "நட்டம் மட்டும" },
    { label: "இலாபம் = இறுதி முதல் + எடுப்புகள் - கூடுதல் முதல் - ………….", correct_answer:"ரூ. 65, 000" , given_answer: "நினைவு வியாபர கணக்கு"},
    { label: "தொடக்க முதலை கண்டறிய, இறுதி முதலுடன் எதனை கூட்ட வேண்டும்", correct_answer:"ரூ. 25, 000", given_answer: "இவற்றில் எதுவுமில்லை" }]
    console.log(this.questions,"???????????/")
  }
save(){
  this.questions;
}
   exportPdf() {
    window.print();
  }
}




