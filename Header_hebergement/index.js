const header = document.querySelector('header');
const headerText = document.querySelector('.headertext');
const widget = document.querySelector('.widget_recherche');
const results = document.querySelector('.results');
const results_filters = document.querySelector('.results_filters');
const results_list = document.querySelector('.results_list');
const results_map = document.querySelector('.results_map');

const widgetDistance = widget.offsetTop;
let lastScroll = 0;
let isScrollingUp = false;
let headerHeight = header.offsetHeight;
let widgetHeight = widget.offsetHeight;
let totalHeight = headerHeight + widgetHeight;

results_filters.addEventListener('click', toggleResultsFilters);

function toggleResultsFilters() {
  results_filters.classList.toggle('open');
}

function detectScrollDirection() {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll) {
    isScrollingUp = false;
  } else {
    isScrollingUp = true;
  }
  lastScroll = currentScroll;
}

function detectHeaderandWidgetHeight() {
  headerHeight = header.offsetHeight;
  widgetHeight = widget.offsetHeight;
  totalHeight = headerHeight + widgetHeight;
  console.log(totalHeight);
}

window.addEventListener('scroll', () => {
  detectScrollDirection();
  detectHeaderandWidgetHeight();

  if (window.scrollY < 50) {
    header.classList.remove('minimized');
    header.classList.remove('scrolledpastwidget');
    headerText.innerText = 'Header Etat de base';
  }

  if (window.scrollY > 50 && window.scrollY < widgetDistance) {
    header.classList.add('minimized');
    header.classList.remove('hidden');

    widget.classList.remove('sticky');
    widget.classList.remove('scrollup');

    results.classList.remove('lockedontop');

    headerText.innerText = 'Header minifié';
    widget.innerText = 'Widget Etat de base';
  }

  if (window.scrollY > widgetDistance && !isScrollingUp) {
    header.classList.add('hidden');
    widget.classList.add('sticky');

    widget.classList.remove('scrollup');
    results.classList.add('lockedontop');
    results_filters.style.top = widgetHeight + 'px';
    results_map.style.top = widgetHeight + 'px';

    widget.innerText = 'Widget sticky';
  }

  if (window.scrollY > widgetDistance && isScrollingUp) {
    header.classList.remove('hidden');
    widget.classList.add('scrollup');
    results_filters.style.top = totalHeight + 'px';
    results_map.style.top = totalHeight + 'px';
  }
});
