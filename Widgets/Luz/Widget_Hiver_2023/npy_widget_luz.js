function npyWidget() {
  const forfaitsSlugs = {
    luz: ['1-jour-luz-1891', '2-jours-npy-luz-1891-1', '3-jours-npy-luz-1891-2', '4-jours-npy-luz-1891-3', '5-jours-npy-luz-1891-4', '6-jours-npy-luz-1891-5', '7-jours-npy-luz-1891-6'],
  };

  // State

  let ff_state = {
    resort: '',
    resortslug: 'luz',
    productslug: '1-jour-luz-1891',
    siteslug: 'luz-ardiden',
    duration: 1,
    firstday: '',
    firstdaymill: new Date().getTime(),
    firstdaystring: '',
    nbadults: 1,
    nbchild: 0,
    nbstud: 0,
    nbtotal: 1,
    url: '',
    ctid: '210',
    pc: 'NPY-LUZ-ARDIDEN-INTERNET',
    vc: '1DAY',
  };

  // Widget
  const widget = document.getElementById('npy-widget-luz');
  const npyWidgetTitle = document.getElementById('npy-widget-luz-title');

  // Openers & closers
  const npyWidgetOpenerDesktop = document.getElementById('npy-widget-luz-opener-desktop');
  const npyWidgetCloser = document.getElementById('npy-widget-luz-closer');

  // Btns
  const btn_details_confirm = document.querySelector('#widget-details-confirm');

  // Inputs
  const ff_input_details = Array.from(document.querySelectorAll('.popover_trigger'));
  const ff_input_date = document.querySelector('#ff-input-date-container');
  const ff_input_date_select = document.querySelector('#ff-datepicker');

  // Listes
  const ff_resortList = Array.from(document.querySelectorAll('#resorts-popover li'));
  const ff_durationList = Array.from(document.querySelectorAll('#duration-popover li'));
  const ff_peoplesList = Array.from(document.querySelectorAll('#skiers-popover .popover_count span'));

  // Compteurs
  const ff_adultsCount = document.querySelector('#adult-score');
  const ff_childCount = document.querySelector('#child-score');
  const ff_studCount = document.querySelector('#stud-score');

  //Labels
  const ff_skiersLabel = document.querySelector('#skiers-label');
  const ff_durationLabel = document.querySelector('#duration-label');

  // Popovers
  const popOvers = Array.from(document.querySelectorAll('.popover'));

  //Ouverture & fermeture du widget // Desktop & mobile

  npyWidgetOpenerDesktop.addEventListener('click', function () {
    if (widget.classList.contains('active')) {
      widget.classList.remove('active');
    } else {
      widget.classList.add('active');
    }
  });

  npyWidgetTitle.addEventListener('click', function () {
    widget.classList.add('active');
  });

  npyWidgetCloser.addEventListener('click', function () {
    widget.classList.remove('active');
  });

  // Choix duree
  ff_durationList.forEach((ele) =>
    ele.addEventListener('click', function (event) {
      ff_state.duration = event.target.dataset.duration;
      ff_state.vc = event.target.dataset.vc;
      ff_state.productslug = forfaitsSlugs[ff_state.resortslug][ff_state.duration];
      console.log(ff_state.productslug);

      for (i = 0; i < ff_durationList.length; i++) {
        ff_durationList[i].classList.remove('active');
      }
      event.target.classList.add('active');
      ff_durationLabel.innerText = event.target.textContent;
      showDateInput();
    })
  );

  // Choix nombre de personnes

  ff_peoplesList.forEach((ele) =>
    ele.addEventListener('click', function (event) {
      if (event.target.id === 'adult-plus') {
        ff_state.nbtotal < 12 ? ff_state.nbadults++ : '';
      } else if (event.target.id === 'adult-moins') {
        ff_state.nbtotal > 0 && ff_state.nbadults > 0 ? ff_state.nbadults-- : '';
      }

      if (event.target.id === 'child-plus') {
        ff_state.nbtotal < 12 ? ff_state.nbchild++ && ff_state.nbtotal++ : '';
      } else if (event.target.id === 'child-moins') {
        ff_state.nbtotal > 0 && ff_state.nbchild > 0 ? ff_state.nbchild-- : '';
      }

      if (event.target.id === 'stud-plus') {
        ff_state.nbtotal < 12 ? ff_state.nbstud++ && ff_state.nbtotal++ : '';
      } else if (event.target.id === 'stud-moins') {
        ff_state.nbtotal > 0 && ff_state.nbstud > 0 ? ff_state.nbstud-- : '';
      }

      ff_state.nbtotal = ff_state.nbadults + ff_state.nbchild + ff_state.nbstud;

      ff_adultsCount.innerText = ff_state.nbadults;
      ff_childCount.innerText = ff_state.nbchild;
      ff_studCount.innerText = ff_state.nbstud;
      ff_skiersLabel.innerText = ff_state.nbtotal;
    })
  );

  // Choix du premier jour
  ff_input_date_select.addEventListener('change', function () {
    ff_state.firstday = this.value;
    ff_state.firstdaymill = new Date(this.value).getTime();
    const firstdayArray = ff_state.firstday.split('-');
    ff_state.firstdaystring = `${firstdayArray[2]}-${firstdayArray[1]}-${firstdayArray[0]}`;
    ff_input_date_select.setAttribute('data-after', ff_state.firstdaystring);
  });

  // Validation vers eliberty
  btn_details_confirm.addEventListener('click', function () {
    const npyTrackUrlFf = '&utm_source=luz.org&utm_medium=referral&utm_campaign=widget_station_luz_forfaits';
    const urlBase = `https://www.n-py.com/fr/luz-ardiden/forfaits-ski?search=true&`;
    const params = `duree=${ff_state.vc}&adults=${ff_state.nbadults}&children=${ff_state.nbchild}&students=${ff_state.nbstud}&start_date=${ff_state.firstdaymill}`;
    const fullUrl = `${urlBase + params + npyTrackUrlFf}`;
    window.open(fullUrl);
  });

  // Gestion de la logique d'affichage et de masquage du champ date
  function showDateInput() {
    if (parseFloat(ff_state.duration[0]) > 5) {
      ff_input_date.classList.add('active');
    } else {
      ff_input_date.classList.remove('active');
    }
  }

  // Ouverture et fermeture des popovers
  function showPopOvers(element) {
    closePopOvers();
    document.getElementById(element).classList.add('active');
  }

  function closePopOvers() {
    for (i = 0; i < popOvers.length; i++) {
      popOvers[i].classList.remove('active');
    }
  }

  //fermeture des popovers au clic en dehors du widget
  document.addEventListener('click', function (e) {
    if (!widget.contains(e.target)) {
      closePopOvers();
    }
  });

  ff_input_details.forEach((ele) =>
    ele.addEventListener('click', function (event) {
      if (event.target.classList.value.includes('widget_choice')) {
        closePopOvers();
      } else {
        showPopOvers(this.dataset.popover);
      }
    })
  );

  // ======================== HBGT ======================== /
}

document.addEventListener('DOMContentReady', npyWidget());
