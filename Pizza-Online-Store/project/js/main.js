/*myLib start*/
; (function () {
  window.myLib = {}; //Создаем глобальную переменную

  window.myLib.body = document.querySelector('body'); //создаем переменную body, находим и присваиваем ей значение элемента body

  window.myLib.closestAttr = function (item, attr) { //функция прыгующая от нижнего элемента к высшему и проверяет есть ли у него нужный аттрибут (функция находящая ближайший аттрибут), принимает элемент и аттрибут
    var node = item; //Если у нас есть html элемент

    while (node) { 
      var attrValue = node.getAttribute(attr); //берем у элемента аттрибут
      if (attrValue) { //если аттрибут совпадает с тем что мы передали в функцию, то мы его возвращаем
        return attrValue;
      }
      node = node.parentElement; //иначе берем его родителя
      //если родителя нет, то в while попадает null и цикл заканчивается
    }
    return null;// если у элемента (и его родителя) нет нужного аттрибута, то возвращаем null
  };

  window.myLib.closestItemByClass = function (item, className) { //функция находящая ближайший элемент по класс
    var node = item;//Если у нас есть html элемент

    while (node) {
      if (node.classList.contains(className)) { //если класс элемента, совпадает с классом который передедали, то возвращаем элемент
        return node;
      }
      node = node.parentElement; //иначе берем его родителя
    }

    return null;// если у элемента (и его родителя) нет нужного класса, то возвращаем null
  };

  window.myLib.toggleScroll = function () { //функция которая делает так чтобы при открытие попапа заднюю часть (body) невозможно было скролить
    window.myLib.body.classList.toggle('no-scroll'); //добаляем к body класс no-scroll
  };
})();
/*myLib end*/

//уменьшение шапки сайта при скролле
/*header start*/ 
; (function () { //Самовызывающая функция. Вызывается сразу при её объявлении. С помощью таких конструкций мы делаем js модульным

  if (window.matchMedia('(max-width: 992px)').matches) //css медиа запрос который багодаря matches проверяет ширину экрана и если она равна 992 пикселя (значение true), то мы выходим и последующий код с уменьшением шапки не выполняется
  {
    return;
  }

  var headerpage = document.querySelector('.header-page');  // Создаем переменную header-page и присваиваем ей класс header-page(шапку)

  window.addEventListener('scroll', function () { //Добаляем обработчик события. Функция вызывающаяся при скролле
    if (window.pageYOffset > 0) //если количество пикселей на которое прокучен документ по вертикали больше 0, то добавляем к header-page класс is-active, т.е делаем класс активным
    {
      headerpage.classList.add('is-active');
    }
    else //иначе убираем из header-page класс is-active 
    {
      headerpage.classList.remove('is-active');
    }
  });
})();
/*header end*/

//скролл к нужным разделам сайта
/*scrollTo start*/
; (function () { //Самовызывающая функция. Вызывается сразу при её объявлении. С помощью таких конструкций мы делаем js модульным

  var scroll = function (target) {
    var targetTop = target.getBoundingClientRect().top; //находим расстояние от того там где мы находимся до секции к которая нам нужна
    var scrollTop = window.pageYOffset; //значение которое мы проскроллили
    var targetOffsetTop = targetTop + scrollTop; //постоянное значение до интересующей секции
    var headerOffset = document.querySelector('header').clientHeight; //высота шапки

    window.scrollTo(0, targetOffsetTop - headerOffset + 25); //скролл до нужного раздела. В качестве параметра x берем нуль, а вкачестве y расстояние до раздела минус высота шапки
  };

  window.myLib.body.addEventListener('click', function (e) { 
    var target = e.target; //находим элемент на который кликнули
    var scrollToItemClass = window.myLib.closestAttr(target, 'data-scroll-to'); //находим ближайший элемент содержащий аттрибут data-scroll-to

    if (scrollToItemClass === null) { //если ближайшего элемента содержащего scrollToItemClass нет, то ничего не делаем
      return;
    }

    e.preventDefault();//убираем стандартное поведение нашего элемента
    var scrollToItem = document.querySelector('.' + scrollToItemClass); //находим элемент к которому хотим сделать скролл по классу

    if (scrollToItem) { //если нашли вызываем функцию scroll и делаем скролл к элементу
      scroll(scrollToItem);
    }
  });
})();
/*scrollTo end*/

//появление всплывающих окон (попапов)
/*popup start*/
//Самовызывающая функция. Вызывается сразу при её объявлении. С помощью таких конструкций мы делаем js модульным

; (function () {
  
  var showPopup = function (target) { //функция для показа попапа. Принимает элемент
    target.classList.add('is-active'); //к элементу добавляем класс is-active
  };



  //открытие попапа
  myLib.body.addEventListener('click', function (e) {// находим значение body и добавляем обработчик события, вызывающий функцию при клике
    var target = e.target; // находи элемент на который кликнули
    var popupClass = myLib.closestAttr(target, 'data-popup'); //находим ближайший элемент содержащий аттрибут data-popup

    if (popupClass === null) { //если popupClass равен нулю, т.е. у элемента на который мы кликнули нет аттрибута data-popup, то мы ничего не делаем
      return;
    }

    e.preventDefault(); //убираем стандартное поведение нашего элемента
    var popup = document.querySelector('.' + popupClass); //создаем переменную popup и задаем ей значение нашего класса (для того чтобы найти класс к его названию добаляем точку)

    if (popup) { //если у нас есть popup, то вызываем ShowPopup и вызываем функцию toggleScroll (делает так чтобы body нельзя было скроллить)
      showPopup(popup);
      myLib.toggleScroll(); 
    }
  });

  var closePopup = function (target) {//функция для закрытия попапа. Принимает элемент
    target.classList.remove('is-active');//у элемента убираем класс is-active
  };

  //закрытие попапа по нажатию на кнопку(крестик) или по нажатию на область экрана вне попапа
  myLib.body.addEventListener('click', function (e) {// находим значение body и добавляем обработчик события, вызывающий функцию при клике
    var target = e.target;// находи элемент на который кликнули
    var popupItemClose = myLib.closestItemByClass(target, 'popup-close');  //находим ближайший элемент содержащий аттрибут popup-close

    if (popupItemClose || //если элемент на который мы кликнули содержит класс popup-close или popup-inner
      target.classList.contains('popup__inner')) {
      var popup = myLib.closestItemByClass(target, 'popup'); //находим попап

      closePopup(popup);// и закрываем его 
      myLib.toggleScroll(); //функция toggleScroll(убирает no-scroll у body)
    }
  });

  //закрытие попапа по нажатию на клавишу(Esc)
  myLib.body.addEventListener('keydown', function (e) {// находим значение body и добавляем обработчик события, вызывающий функцию при нажатии клавиши
    if (e.keyCode !== 27) {//если код нажатой клавиши не равен 27(клавиша не является Esc), то ничего не происходит
      return;
    }

    var popup = document.querySelector('.popup.is-active');//иначе находим активный попап

    if (popup) { //если есть попап, то вызываем closePopup и функцию toggleScroll(убирает no-scroll у body)
      closePopup(popup);
      myLib.toggleScroll();
    }
  });
})();
/*popup end*/


//фильтрация 
/*catalog start*/
; (function () {
  var catalogSection = document.querySelector('.section-catalog'); //находим catalog-section

  if (catalogSection === null) { //если равен null то выходи и ничего не делаем
    return;
  }

  //функция которая удаляет элементы
  var removeChildren = function (item) {
    while (item.firstChild) { //пока у родителя есть первый элемент происходит его удаление
      item.removeChild(item.firstChild);
    }
  };
  //функция которая выводит элементы
  var updateChildren = function (item, children) {
    removeChildren(item);//вызывем функцию очищающую catalog

    for (var i = 0; i < children.length; i += 1) { //запускаем цикл который идет по детям и каждый ребенок добавляется в item
      item.appendChild(children[i]);
    }
  };

  var catalog = catalogSection.querySelector('.catalog'); //находим catalog у section-catalog
  var catalogNav = catalogSection.querySelector('.catalog-nav');//находим catalog-nav у section-catalog (находим кнопку на которую кликнули)
  var catalogItems = catalogSection.querySelectorAll('.catalog__item');//находим catalog__item у section-catalog (еременная в которой хранятся все элементы)

  catalogNav.addEventListener('click', function (e) {//Добаляем обработчик события для catalogNav. 
    var target = e.target; //создаем переменную которая равна тому элементу на который мы кликнули
    var item = myLib.closestItemByClass(target, 'catalog-nav__btn');//находим кнопку

    if (item === null || item.classList.contains('is-active')) { //если элемент на который мы кликнули не кнопка или кнопка уже активна, то ничего не происходит
      return;
    }

    e.preventDefault(); //убираем стандартное поведение нашего элемента

    var filterValue = item.getAttribute('data-filter');//находим аттрибут data-filter у кнопки 
    var previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active'); //находим предыдущую активную кнопку

    previousBtnActive.classList.remove('is-active'); // упредыдущей активной кнопки убираем is-active
    item.classList.add('is-active');// у текущий кнопки добавляем класс is-active

    if (filterValue === 'all') { //если filterValue (data-filter у кнопки) равен all
      updateChildren(catalog, catalogItems); //вызываем функцию updateChildren куда передаем catalog и catalogItems(все элементы)
      return;
    }

    //если filterValue не равняется all,
    var filteredItems = []; // то создаем пустой массив filteredItems
    for (var i = 0; i < catalogItems.length; i += 1) { //запускаем цикл по всем Item-ам
      var current = catalogItems[i]; //берем текущий элемент
      if (current.getAttribute('data-category') === filterValue) { //проверяем у текущего элемента data-category, если он равен filterValue (значению кнопки),
        filteredItems.push(current);// то добавляем в массив filteredValue
      }
    }

    updateChildren(catalog, filteredItems);//вызываем функцию updateChildren куда передаем catalog и filteredItems(массив с отфильтрованными Item-ами)
  });
})();
/*catalog end*/

/*product start*/
; (function () {
  var catalog = document.querySelector('.catalog'); //находим catalog
  if (catalog === null) { //если catalog равен null то возвращаемся и ничего не происходит 
    return;
  }

  var changeProductSize = function (target) { //ыункция меняющая размер пиццы
    var product = myLib.closestItemByClass(target, 'product'); //находим родителя имеющего класс product
    var previousBtnActive = product.querySelector('.product__size.is-active'); //находим предыдущую активную кнопку

    previousBtnActive.classList.remove('is-active'); //убираем класс is-active  у предыдущей кнопки
    target.classList.add('is-active'); //добавляем к новой кнопки класс is-active
  };

  var changeProductOrderInfo = function (target) {
    var product = myLib.closestItemByClass(target, 'product');
    var order = document.querySelector('.popup-order');

    var productTitle = product.querySelector('.product__title').textContent;
    var productSize = product.querySelector('.product__size.is-active').textContent;
    var productPrice = product.querySelector('.product__price-value').textContent;
    var productImgSrc = product.querySelector('.product__img').getAttribute('src');


    order.querySelector('.order-info-title').setAttribute('value', productTitle);
    order.querySelector('.order-info-size').setAttribute('value', productSize);
    order.querySelector('.order-info-price').setAttribute('value', productPrice);

    order.querySelector('.order-product-title').textContent = productTitle;
    order.querySelector('.order-product-price').textContent = productPrice;
    order.querySelector('.order__size').textContent = productSize;
    order.querySelector('.order__img').setAttribute('src', productImgSrc);
  };

  catalog.addEventListener('click', function (e) {//Добаляем обработчик события который вызывает функцию при клике
    var target = e.target; //элемент на котрый кликнули

     (target.classList.contains('product__size') && !target.classList.contains('is-active')) //если внутри target есть product__size и target не активен,  
     {
        e.preventDefault();//убираем стандартное поведение нашего элемента
        changeProductSize(target); //меняем активную кнопку (размер)
     }

    if (target.classList.contains('product__btn')) {
      e.preventDefault();
      changeProductOrderInfo(target);
    }
  });
})();
/*product end*/

//карта
/*map start*/
; (function () {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('ymap', {
      center: [55.113828, 59.719560],
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),

      myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContent: 'г. Златоуст ул. Тургенева д. 16'
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: '../project/img/common/map-icon.png',
        // Размеры метки.
        iconImageSize: [40, 40],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-50, -38]
      });

    myMap.geoObjects.add(myPlacemark)
  });
})();
/*map end*/



/*form start*/
; (function () {
  var forms = document.querySelectorAll('.form-send');

  if (forms.length === 0) {
    return;
  }

  var serialize = function (form) {
    var items = form.querySelectorAll('input, select, textarea');
    var str = '';
    for (var i = 0; i < items.length; i += 1) {
      var item = items[i];
      var name = item.name;
      var value = item.value;
      var separator = i === 0 ? '' : '&';

      if (value) {
        str += separator + name + '=' + value;
      }
    }
    return str;
  };

  var formSend = function (form) {
    var data = serialize(form);
    var xhr = new XMLHttpRequest();
    var url = 'mail/mail.php';

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
      var activePopup = document.querySelector('.popup.is-active');

      if (activePopup) {
        activePopup.classList.remove('is-active');
      } else {
        myLib.toggleScroll();
      }

      if (xhr.response === 'success') {
        document.querySelector('.popup-thanks').classList.add('is-active');
        document.dispatchEvent(new CustomEvent('reset-cart'));
      }
      else {
        document.querySelector('.popup-error').classList.add('is-active');
      }

      form.reset();
    };

    xhr.send(data);
  };

  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
})();
/*form end*/


/*shoping cart start*/
; (function () { /*Самовызывающаяся функция*/
  const cartDOMElement = document.querySelector('.js-cart'); /*Находим корзину DOMElement используется для того чтобы отделять наши переменные и переменные в котороых хранятся данные*/

  if (!cartDOMElement) { /*Если .js-cart не найден скрипт не выполняется*/
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart')) || {}; /*Создаем переменную корзина*/
  //const cart = {};
  const cartItemsCounterDOMElement = document.querySelector('.js-cart-total-count-items'); /*Элемент в корзине в который будут записываться количество элементов*/
  const cartTotalPriceDOMElement = document.querySelector('.js-cart-total-price');/*Элемент в корзине в который будет записываться общая цена*/
  const cartTotalPriceInputDOMElement = document.querySelector('.js-cart-total-price-input'); /*Скрытый элемент (поле) показывающее общую сумму которая будет приходить в заявке*/
  const cartWrapperDOMElement = document.querySelector('.js-cart-wrapper'); //Находим класс js-cart-wrapper


  const renderCartItem = ({ id, name, attribute, src, price, quantity }) => {/*Функция отображающая элемент в корзине. В функцию мы передаем объект который разбивается на переменные*/
    const cartItemDOMElement = document.createElement('div'); //Создаем переменную в которую записываем div (по сути мы создаем div)

    /*Шаблон*/
    const cartItemTemplate = `
        <div class="cart-item cart__item">
          <div class="cart-item__main">
            <div class="cart-item__start">
              <button class="cart-item__btn cart-item__btn--remove js-btn-cart-item-remove" type="button"></button>
            </div>
            <div class="cart-item__img-wrapper">
              <img class="cart-item__img" src="${src}" alt="">
            </div>
            <div class="cart-item__content">
              <h3 class="cart-item__title">${name}</h3>
              <input type="hidden" name="${id}-Товар" value="${name}">
              <input class="js-cart-input-quantity" type="hidden" name="${id}-Количество" value="${quantity}">
              <input class="js-cart-input-price" type="hidden" name="${id}-Цена" value="${price * quantity}">
              <p class="cart-item__attribute">${attribute}</p><input type="hidden" name="${id}-Аттрибут" value="${attribute}">
            </div>
          </div>
          <div class="cart-item__end">
            <div class="cart-item__actions">
              <button class="cart-item__btn js-btn-product-decrease-quantity" type="button">-</button>
              <span class="cart-item__quantity js-cart-item-quantity">${quantity}</span>
              <button class="cart-item__btn js-btn-product-increase-quantity" type="button">+</button>
            </div>
            <p class="cart-item__price"><span class="js-cart-item-price">${price * quantity}</span> ₽</p>
          </div>
        </div>
        `;

    cartItemDOMElement.innerHTML = cartItemTemplate; /*С помощью innerHTML добавляем в переменную cartItemDOMElement html-разметку из cartItemTemplate*/
    cartItemDOMElement.setAttribute('data-product-id', id); //Устанавливаем аттрибут data-product-id равным id 
    cartItemDOMElement.classList.add('js-cart-item'); /*добавляем класс js-cart-item*/

    cartDOMElement.appendChild(cartItemDOMElement); /*Добавляем в cartDOMElement (корзину) cartItemDOMElement*/
  };

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

/*Функция обновляющая общую цену*/
/*  const updateCartTotalPrice = () => {
    const totalPrice = Object.keys(cart).reduce((acc, id) => {
      const { quantity, price } = cart[id];
      return acc + price * quantity;
    }, 0);

    if (cartTotalPriceDOMElement) {
      cartTotalPriceDOMElement.textContent = totalPrice;
    }

    if (cartTotalPriceInputDOMElement) {
      cartTotalPriceInputDOMElement.value = totalPrice;
    }
  };*/

  /*Функция обновляющая общую цену*/
  const updateCartTotalPrice = () => {
    const ids = Object.keys(cart); //Берем идентификаторы
    Let totalPrice = 0; //Создаем переменную totalPrice
    for(Let i = 0; i < ids.lengts; i+=1)
    {
      const id = ids[i]; //Берем id нашего товара
      totalPrice += cart[id].price * cart[id].quantity;
    }
    if (cartTotalPriceDOMElement) {
      cartTotalPriceDOMElement.textContent = totalPrice;
    }

    if (cartTotalPriceInputDOMElement) {
      cartTotalPriceInputDOMElement.value = totalPrice;
    }
  };

   /*Функция обновляющая общее количество*/
  const updateCartTotalItemsCounter = () => {
    const ids = Object.keys(cart); //Берем идентификаторы
    Let totalQuantity = 0; //Создаем переменную totalQuantity
    for(Let i = 0; i < ids.lengts; i+=1)
    {
      const id = ids[i]; //Берем id нашего товара
      totalQuantity += cart[id].quantity;
    }

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
    }

    return totalQuantity;
  };

  /*Функция обновляющая общее количество*/
  /*const updateCartTotalItemsCounter = () => {
    const totalQuantity = Object.keys(cart).reduce((acc, id) => {
      const { quantity } = cart[id];
      return acc + quantity;
    }, 0);

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
    }

    return totalQuantity;
  };*/
  

  /*Функция обновляющая корзину*/
  /*Cдесь мы также будем сохранять корзину в local storage, высчитывать общее число элементов в корзине и цену*/
  const updateCart = () => {
    const totalQuantity = updateCartTotalItemsCounter();/*Обновляем общее количество элементов*/
    updateCartTotalPrice();/*Обновляем общую цену элементов*/
    saveCart();

    if (totalQuantity === 0) { /*Если число товаров 0*/
      cartWrapperDOMElement.classList.add('is-empty'); // То добаляем класс is-empty у js-cart-wrapper
    } else {
      cartWrapperDOMElement.classList.remove('is-empty');// Иначет убираем класс is-empty у js-cart-wrapper
    }
  };

  /*Функция удаляющая из корзины*/
  const deleteCartItem = (id) => {
    const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`); /*По id находим элемент в корзине*/

    cartDOMElement.removeChild(cartItemDOMElement); /*Передаем элемент для удаления. т.е. удаляем из физической корзины*/
    delete cart[id];/*Удаляем из переменной корзина*/
    updateCart();/*Запускаем функцию по обновлению корзины*/
  };

  const addCartItem = (data) => { /*Функция которая добавляет данные в корзину*/
    const { id } = data; /*В переменную id записываем data id*/

    if (cart[id]) { //Если в корзине есть элемент с таким id
      increaseQuantity(id); //То увеличиваем количества элемента, а не добавляем новый элемент в корзину
      return;
    }

    cart[id] = data; /*Делает так что ключом товара становится id, а телом объект с датой*/
    renderCartItem(data); /*Запускаем функцию которая отображает товары в корзине*/
    updateCart();/*Запускаем функцию по обновлению корзины*/
  };

  //Функция для обнавления количества элементов
  const updateQuantity = (id, quantity) => {
    const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);/*По id находим элемент в корзине*/
    const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-item-quantity');//У элемента корзины мы найдем счетчик количества
    const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-item-price');//У элемента корзины мы найдем счетчик цену
    const cartItemInputPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-input-price');
    const cartItemInputQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-input-quantity');

    cart[id].quantity = quantity; //Сохраняем новое количество
    cartItemQuantityDOMElement.textContent = quantity;//Меняем у физической корзины количество
    cartItemPriceDOMElement.textContent = quantity * cart[id].price;//Меняем у физической корзины цену
    cartItemInputPriceDOMElement.value = quantity * cart[id].price;//Меняем у физической корзины цену
    cartItemInputQuantityDOMElement.value = quantity;

    updateCart();
  };

  const decreaseQuantity = (id) => {
    const newQuantity = cart[id].quantity - 1; //Используя id Берем из cart(корзины) количество у нашего элемента и уменьшаем количество на один
    if (newQuantity >= 1) { //если новое количество элементов больше или равно 1, то 
      updateQuantity(id, newQuantity);// Вызываем функцию по обнавлению количества элементов
    }
  };

  //Функция по увеличению числа товаров. В нее передаем id 
  const increaseQuantity = (id) => {
    const newQuantity = cart[id].quantity + 1;//Используя id Берем из cart(корзины) количество у нашего элемента и увеличиваем количество на один
    updateQuantity(id, newQuantity); // Вызываем функцию по обнавлению количества элементов
  };

  /*Функция генирирующая ID*/
  const generateID = (string1, string2) => {
    const secondParam = string2 ? `-${string2}` : ''; /*Если есть string2 (атрибут), то ставим дефис, иначе ствим пустую строку*/
    return `${string1}${secondParam}`.replace(/ /g, '-'); /*Возвращаем id (Имя и аттрибут) и с помощью регулярного выражения(используем g, т.е глобал) заменяем все пробелы знаками тире*/
  };

  /*2.*/
  /*Функция в которой считываюся аттрибуты из js-poduct (из ячейки товара)*/
  const getProductData = (productDOMElement) => { 
    const name = productDOMElement.getAttribute('data-product-name');/*Находим имя продукта*/
    const attribute = productDOMElement.getAttribute('data-product-attribute');/*Находим аттрибут продукта*/
    const price = productDOMElement.getAttribute('data-product-price');/*Находим размер продукта*/
    const src = productDOMElement.getAttribute('data-product-src');/*Находим изображение продукта*/
    const quantity = 1; /*Количество*/
    const id = generateID(name, attribute);/*Создаем ID используя имя и аттрибут*/

    return { name, attribute, price, src, quantity, id }; /*Возвращаем полученные данные*/
  };

  const renderCart = () => {
    const ids = Object.keys(cart);
    ids.forEach((id) => renderCartItem(cart[id]));
  };

  const resetCart = () => {
    const ids = Object.keys(cart);
    ids.forEach((id) => deleteCartItem(cart[id].id));
  };

  /*1.*/
  const cartInit = () => { /*Стрелочная функция cartInit*/
    renderCart();
    updateCart();

    document.addEventListener('reset-cart', resetCart);

    document.querySelector('body').addEventListener('click', (e) => { /*Находим элемент на который кликнули с помощью обработчика событий*/
      const target = e.target; /*Задаем переменную (target = элемент на который кликнули)*/ 

      if (target.classList.contains('js-btn-add-to-cart')) { /*Если у элемента есть класс js-btn-add-to-cart(нажали кнопку добавления в корзину)*/
        e.preventDefault(); /*Предотвращаем стандартное поведение кнопки*/
        const productDOMElement = target.closest('.js-product'); /*По нажатию на кнопку находим productDOMElement (т.е нажимая на кнопку мы от кнопки подымаемся выше до родителя где есть js-product)*/
        const data = getProductData(productDOMElement); /*Запускаем функцию которая считывает аттрибуты из js-product (из ячейки в которой пицца). Этот объект мы и будем записывать в корзину*/
        addCartItem(data); /*Вызываем функцию добавляющую данные (элементы) в корзину*/
      }

      if (target.classList.contains('js-btn-cart-item-remove')) {/*Если у элемента есть класс js-btn-cart-item-remove(нажали кнопку удаления из корзины)*/
        e.preventDefault();/*Предотвращаем стандартное поведение кнопки*/
        const cartItemDOMElement = target.closest('.js-cart-item');/*По нажатию на кнопку находим cartItemDOMElement (т.е нажимая на кнопку мы от кнопки подымаемся выше до родителя где есть js-cart-item (Ячейка мз корзины в которой находится инфа о товаре))*/
        const productID = cartItemDOMElement.getAttribute('data-product-id'); /*Считывем у cart-item id*/
        deleteCartItem(productID); /*Вызываем функцию удаления из корзины в которую предаем id*/
      }

      if (target.classList.contains('js-btn-product-increase-quantity')) {/*Если у элемента есть класс js-btn-product-increase-quantity(нажали кнопку увеличение числа элементов корзины)*/
        e.preventDefault();/*Предотвращаем стандартное поведение кнопки*/
        const cartItemDOMElement = target.closest('.js-cart-item');/*По нажатию на кнопку находим cartItemDOMElement (т.е нажимая на кнопку мы от кнопки подымаемся выше до родителя где есть js-cart-item (Ячейка мз корзины в которой находится инфа о товаре))*/
        const productID = cartItemDOMElement.getAttribute('data-product-id');/*Считывем у cart-item id*/
        increaseQuantity(productID);/*Вызываем функцию увеличения числа товаров в которую предаем id*/
      }

      if (target.classList.contains('js-btn-product-decrease-quantity')) {/*Если у элемента есть класс js-btn-product-decrease-quantity(нажали кнопку уменьшения числа элементов корзины)*/
        e.preventDefault();/*Предотвращаем стандартное поведение кнопки*/
        const cartItemDOMElement = target.closest('.js-cart-item');/*По нажатию на кнопку находим cartItemDOMElement (т.е нажимая на кнопку мы от кнопки подымаемся выше до родителя где есть js-cart-item (Ячейка мз корзины в которой находится инфа о товаре))*/
        const productID = cartItemDOMElement.getAttribute('data-product-id');/*Считывем у cart-item id*/
        decreaseQuantity(productID);/*Вызываем функцию уменьшения числа товаров в которую предаем id*/
      }

      if (target.classList.contains('js-btn-product-attribute')) {/*Если у элемента есть класс js-btn-product-attribute(нажали кнопку изменения размера пиццы)*/
        e.preventDefault();/*Предотвращаем стандартное поведение кнопки*/
        const attribute = target.getAttribute('data-product-attribute-value'); //Берем у кнопок аттрибуты
        const price = target.getAttribute('data-product-attribute-price');//Берем у цену у кнопки
        const productDOMElement = target.closest('.js-product');/*По нажатию на кнопку находим productDOMElement (т.е нажимая на кнопку мы от кнопки подымаемся выше до родителя где есть js-product)*/
        const activeAttributeDOMElement = productDOMElement.querySelector('.js-btn-product-attribute.is-active');  //Находим активную элемент у товара
        const productPriceDOMElement = productDOMElement.querySelector('.js-product-price-value'); //Находим цену

        productPriceDOMElement.textContent = price; //Изменяем цену товара
        productDOMElement.setAttribute('data-product-attribute', attribute); //Задаем новый аттрибут у товара
        productDOMElement.setAttribute('data-product-price', price); //Задаем новый аттрибут у товара
        activeAttributeDOMElement.classList.remove('is-active'); //У активного элемента удаляем класс is-active
        target.classList.add('is-active'); //Для текущего элемента добавляем класс is-active
      }
    });
  };

  cartInit();
})();
/*shoping cart end*/

/*
;(function () { 
  const cartDOMElement = document.querySelector('.js-cart'); 

  if (!cartDOMElement) { 
    return;
  }

  const cart = {};
  const cartItemsCounterDOMElement = document.querySelector('.js-cart-total-count-items');
  const cartTotalPriceDOMElement = document.querySelector('.js-cart-total-price');
  const cartTotalPriceInputDOMElement = document.querySelector('.js-cart-total-price-input'); 
  const cartWrapperDOMElement = document.querySelector('.js-cart-wrapper');


  const renderCartItem = ({ id, name, attribute, src, price, quantity }) => {
    const cartItemDOMElement = document.createElement('div');

    const cartItemTemplate = `
        <div class="cart-item cart__item">
          <div class="cart-item__main">
            <div class="cart-item__start">
              <button class="cart-item__btn cart-item__btn--remove js-btn-cart-item-remove" type="button"></button>
            </div>
            <div class="cart-item__img-wrapper">
              <img class="cart-item__img" src="${src}" alt="">
            </div>
            <div class="cart-item__content">
              <h3 class="cart-item__title">${name}</h3>
              <input type="hidden" name="${id}-Товар" value="${name}">
              <input class="js-cart-input-quantity" type="hidden" name="${id}-Количество" value="${quantity}">
              <input class="js-cart-input-price" type="hidden" name="${id}-Цена" value="${price * quantity}">
              <p class="cart-item__attribute">${attribute}</p><input type="hidden" name="${id}-Аттрибут" value="${attribute}">
            </div>
          </div>
          <div class="cart-item__end">
            <div class="cart-item__actions">
              <button class="cart-item__btn js-btn-product-decrease-quantity" type="button">-</button>
              <span class="cart-item__quantity js-cart-item-quantity">${quantity}</span>
              <button class="cart-item__btn js-btn-product-increase-quantity" type="button">+</button>
            </div>
            <p class="cart-item__price"><span class="js-cart-item-price">${price * quantity}</span> ₽</p>
          </div>
        </div>
        `;

    cartItemDOMElement.innerHTML = cartItemTemplate; 
    cartItemDOMElement.setAttribute('data-product-id', id); 
    cartItemDOMElement.classList.add('js-cart-item'); 

    cartDOMElement.appendChild(cartItemDOMElement); 
  };

  const updateCartTotalPrice = () => {
    const ids = Object.keys(cart); 
    Let totalPrice = 0; 
    for(Let i = 0; i < ids.lengts; i+=1)
    {
      const id = ids[i]; 
      totalPrice += cart[id].price * cart[id].quantity;
    }
    if (cartTotalPriceDOMElement) {
      cartTotalPriceDOMElement.textContent = totalPrice;
    }

    if (cartTotalPriceInputDOMElement) {
      cartTotalPriceInputDOMElement.value = totalPrice;
    }
  };

  const updateCartTotalItemsCounter = () => {
    const ids = Object.keys(cart); 
    Let totalQuantity = 0; 
    for(Let i = 0; i < ids.lengts; i+=1)
    {
      const id = ids[i]; 
      totalQuantity += cart[id].quantity;
    }

    if (cartItemsCounterDOMElement) {
      cartItemsCounterDOMElement.textContent = totalQuantity;
    }

    return totalQuantity;
  };
  
  const updateCart = () => {
    const totalQuantity = updateCartTotalItemsCounter();
    updateCartTotalPrice();

    if (totalQuantity === 0) { 
      cartWrapperDOMElement.classList.add('is-empty'); 
    } else {
      cartWrapperDOMElement.classList.remove('is-empty');
    }
  };

  const deleteCartItem = (id) => {
    const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`); 

    cartDOMElement.removeChild(cartItemDOMElement); 
    delete cart[id];
    updateCart();
  };

  const addCartItem = (data) => { 
    const { id } = data;

    if (cart[id]) {
      increaseQuantity(id); 
      return;
    }

    cart[id] = data; 
    renderCartItem(data);
    updateCart();
  };

  const updateQuantity = (id, quantity) => {
    const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-id="${id}"]`);
    const cartItemQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-item-quantity');
    const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-item-price');
    const cartItemInputPriceDOMElement = cartItemDOMElement.querySelector('.js-cart-input-price');
    const cartItemInputQuantityDOMElement = cartItemDOMElement.querySelector('.js-cart-input-quantity');

    cart[id].quantity = quantity;
    cartItemQuantityDOMElement.textContent = quantity;
    cartItemPriceDOMElement.textContent = quantity * cart[id].price;
    cartItemInputPriceDOMElement.value = quantity * cart[id].price;
    cartItemInputQuantityDOMElement.value = quantity;

    updateCart();
  };

  const decreaseQuantity = (id) => {
    const newQuantity = cart[id].quantity - 1; 
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const increaseQuantity = (id) => {
    const newQuantity = cart[id].quantity + 1;
    updateQuantity(id, newQuantity); 
  };

  const generateID = (string1, string2) => {
    const secondParam = string2 ? `-${string2}` : ''; 
    return `${string1}${secondParam}`.replace(/ /g, '-');
  };

  const getProductData = (productDOMElement) => { 
    const name = productDOMElement.getAttribute('data-product-name');
    const attribute = productDOMElement.getAttribute('data-product-attribute');
    const price = productDOMElement.getAttribute('data-product-price');
    const src = productDOMElement.getAttribute('data-product-src');
    const quantity = 1; 
    const id = generateID(name, attribute);

    return { name, attribute, price, src, quantity, id };
  };

  const cartInit = () => { 
    updateCart();

    document.querySelector('body').addEventListener('click', (e) => { 
      const target = e.target;  

      if (target.classList.contains('js-btn-add-to-cart')) { 
        const productDOMElement = target.closest('.js-product'); 
        const data = getProductData(productDOMElement);
      }

      if (target.classList.contains('js-btn-cart-item-remove')) {
        e.preventDefault();
        const cartItemDOMElement = target.closest('.js-cart-item');
        const productID = cartItemDOMElement.getAttribute('data-product-id');
        deleteCartItem(productID); 
      }

      if (target.classList.contains('js-btn-product-increase-quantity')) {
        e.preventDefault()
        const cartItemDOMElement = target.closest('.js-cart-item');
        const productID = cartItemDOMElement.getAttribute('data-product-id');
        increaseQuantity(productID);
      }

      if (target.classList.contains('js-btn-product-decrease-quantity')) {
        e.preventDefault();
        const cartItemDOMElement = target.closest('.js-cart-item');
        const productID = cartItemDOMElement.getAttribute('data-product-id');
        decreaseQuantity(productID);
      }

      if (target.classList.contains('js-btn-product-attribute')) {
        const attribute = target.getAttribute('data-product-attribute-value'); 
        const price = target.getAttribute('data-product-attribute-price');
        const productDOMElement = target.closest('.js-product');
        const activeAttributeDOMElement = productDOMElement.querySelector('.js-btn-product-attribute.is-active'); 
        const productPriceDOMElement = productDOMElement.querySelector('.js-product-price-value'); 

        productPriceDOMElement.textContent = price; 
        productDOMElement.setAttribute('data-product-attribute', attribute);
        productDOMElement.setAttribute('data-product-price', price);
        activeAttributeDOMElement.classList.remove('is-active'); 
        target.classList.add('is-active'); 
      }
    });
  };

  cartInit();
})();
*/