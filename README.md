
# Проект сайта пиццерии

Проект сайта пиццерии. Разметка сайта полностью адаптирована под различного рода устройства.

## Функционал

- **Сортировка товаров по категориям**: Вы можете просматривать все товары или пиццы из определенной.
- **Изменение размера пиццы**: Вы можете изменять размер каждой пиццы.
- **Добавление в корзину**: Легко добавляйте товары в корзину для последующего заказа.
- **Удаление из корзины**: Удаляйте товары из корзины, если передумали.
- **Увеличение/изменение количества товара в корзине**: Регулируйте количество товаров в корзине.
- **Отправка информации о заказе на почту**: После оформления заказа информация будет отправлена на вашу почту.

## Структура сайта

- **Шапка сайта**: Предоставляет навигацию по категориям сайта.
- **Баннер**: Содержит краткую информацию о пиццерии (название, слоган и т.п.).
- **Продукция**: Раздел с товарами содержит в себе кнопки для сортировки товаров по категориям, а также карточки с информацией о товарах.
- **О нас**: Раздел с подробной информацией о пиццерии.
- **Контакты**: Раздел с контактной информацией, включая местоположения на карте.
- **Подвал**: Нижний раздел сайта с логотипом компании.
- **Кнопка для перехода в корзину**: Содержит в себе счетчик товаров, а также позволяет перейти в корзину.
- **Всплывающее окно корзины**: Содержит список с карточками товаров, добавленных в корзину, а также поля для указания контакной информации заказчика.

## Технологии

- **HTML**: Структура сайта.
- **CSS**: Стилизация и оформление.
- **JavaScript**: Взаимодействие с пользователем и динамическое обновление контента.
- **PHP**: Подключение и взаимодействие с базой данных.
- **MySQL**: Хранение данных о товарах и заказах.
- **Api Яндекс карты**: Карта с расположением магазина.

### Требования

- Веб-сервер (например, Apache)
- PHP 7.4 или выше
- MySQL 5.7 или выше

## Интерфейс

<p align="center">
  <img src="https://github.com/user-attachments/assets/94151e67-cd5e-4e41-a5d4-dfe91fea6e4c" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/a1b5ce0d-9137-480f-af61-bd83ad52662c" alt="Мобильная версия" width="19%">
</p>

*Заглавный баннер сайта*

<p align="center">
  <img src="https://github.com/user-attachments/assets/f2a4d79e-7af1-4909-99b1-68473f60ddf5" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/8a69bec3-b546-4cca-8c75-e625c1ff0a22" alt="Мобильная версия" width="19%">
</p>

*Раздел с товарами*

<p align="center">
  <img src="https://github.com/user-attachments/assets/1baf7443-f704-4faa-9ee7-4c393fdd27aa" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/3c0cdd12-e88d-49e6-a713-a8d345db97a8" alt="Мобильная версия" width="19%">
</p>

*Карточки товаров*

<p align="center">
  <img src="https://github.com/user-attachments/assets/ff6700b4-bbb3-40d5-a874-1b23ab4d1781" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/65194b10-30e9-42ac-9e58-e07b33522258" alt="Мобильная версия" width="19%">
</p>

*Раздел с информацией о пиццерии*

<p align="center">
  <img src="https://github.com/user-attachments/assets/96a5619b-bf30-4eda-bd53-a0cc00123a8a" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/ce20f2e1-573e-4cc4-a0d1-b419490cdfe2" alt="Мобильная версия" width="19%">
</p>

*Раздел с контактной информацией*

<p align="center">
  <img src="https://github.com/user-attachments/assets/751b27c7-ab34-4eb6-9f70-64012c6504e1" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/e51ffdde-de75-4c21-a112-b4d565e68979" alt="Мобильная версия" width="19%">
</p>

*Пустая корзина*

<p align="center">
  <img src="https://github.com/user-attachments/assets/c0779a39-cd63-4381-b782-831ef78836b9" alt="Десктопная версия" width="71%">
  <img src="https://github.com/user-attachments/assets/7f10a433-ccc4-45cd-a7cc-35ba6f79cd5f" alt="Мобильная версия" width="19%">
</p>

*Корзина с товарами*

## Подключение к базе данных

Для подключения к базе данных необходимо произвести настройку файла database.php. 

```
<?php
$servrer = "";
$login = "root";
$pass = "";
$name_db = "pizza-store";
$link = mysqli_connect($server,$login,$pass,$name_db);

if ($link == False)
{
  echo "Соединение не удалось";
}
 ?>
```

## Настройка почты

Для настройки почты необходимо указать данные почтового ящика в файле mail.php

```
$admin_email = 'your email here';
```
