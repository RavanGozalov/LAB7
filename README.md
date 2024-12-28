# Звіт з лабораторної роботи №7
## Дослідження фільтра Калмана

### Мета роботи
- Дослідити вплив різних параметрів фільтра Калмана на якість фільтрації сигналу
- Проаналізувати зміни дисперсії шуму до та після фільтрації
- Визначити оптимальні параметри фільтра для різних умов роботи

### Дослідження параметрів фільтра Калмана

**Початковий стан системи**
<p align="center">
<img src="Screenshots/1.jpg" alt="Базові параметри"/>
</p>

Даний графік демонструє роботу фільтра Калмана з базовими параметрами:
- F = 1.0, H = 1.0, Q = 1.0, R = 10.0, P = 1.0 
- Початковий стан: x = 0

**1. Вплив параметрів F та H**
<p align="center">
<img src="Screenshots/2.jpg" alt="F = 0.25"/>
</p>

При малому значенні F = 0.25 фільтр демонструє дуже повільну реакцію на зміни сигналу.

<p align="center">
<img src="Screenshots/3.jpg" alt="F = 15.0"/>
</p>

При великому значенні F = 15.0 фільтр реагує швидко, але його робота стає менш стабільною.

<p align="center">
<img src="Screenshots/4.jpg" alt="H = 0.2"/>
</p>

Коли H = 0.2, фільтр слабко пов'язаний з вхідними даними, що призводить до низької реакції на зміни.

<p align="center">
<img src="Screenshots/5.jpg" alt="H = 7.5"/>
</p>

При H = 7.5 фільтр сильно залежить від вхідних даних, що знижує його стабільність.

**2. Вплив ковариації шуму процесу (Q)**
<p align="center">
<img src="Screenshots/6.jpg" alt="Q = 0.025"/>
</p>

Мале значення Q = 0.025 забезпечує максимально плавну фільтрацію, але знижує реакцію на зміни сигналу.

<p align="center">
<img src="Screenshots/7.jpg" alt="Q = 75.0"/>
</p>

Велике значення Q = 75.0 дозволяє фільтру швидко реагувати на зміни, але погіршує фільтрацію шуму.

**3. Вплив ковариації шуму вимірювань (R)**
<p align="center">
<img src="Screenshots/8.jpg" alt="R = 0.25"/>
</p>

Мале значення R = 0.25 призводить до того, що фільтр майже повністю слідує за вхідними вимірами.

<p align="center">
<img src="Screenshots/9.jpg" alt="R = 150.0"/>
</p>

Велике значення R = 150.0 забезпечує високу стабільність роботи фільтра, але знижує його реакцію на зміни.

**4. Вплив початкової ковариації (P)**
<p align="center">
<img src="Screenshots/10.jpg" alt="P = 0.025"/>
</p>

Мале значення P = 0.025 призводить до повільної початкової збіжності фільтра.

**5. Вплив початкового стану**
<p align="center">
<img src="Screenshots/11.jpg" alt="x = 25.0"/>
</p>

Коли початковий стан x = 25.0, система демонструє значне початкове відхилення.

<p align="center">
<img src="Screenshots/12.jpg" alt="x = 10.0"/>
</p>

Коли початковий стан x = 10.0, фільтр швидко та точно підлаштовується під реальний сигнал.

**6. Вплив зміщення сигналу**
<p align="center">
<img src="Screenshots/13.jpg" alt="Зміщення = 35.0"/>
</p>

При зміщенні сигналу на 35.0 фільтр стабільно відслідковує сигнал.

<p align="center">
<img src="Screenshots/14.jpg" alt="Зміщення = -15.0"/>
</p>

При зміщенні на -15.0 система коректно адаптується до нового рівня.

**7. Вплив часу моделювання**
<p align="center">
<img src="Screenshots/15.jpg" alt="Час = 0.75с"/>
</p>

При часі моделювання 0.75с отримуємо базову оцінку роботи фільтра.

<p align="center">
<img src="Screenshots/16.jpg" alt="Час = 7.5с"/>
</p>

При збільшенні часу моделювання до 7.5с підтверджується стабільність роботи фільтра.

### Висновки

В ході дослідження фільтра Калмана було визначено, що найбільш критичними параметрами є F, R та Q. Їх оптимальні значення залежать від конкретного застосування:

Для стабільних систем: малі значення F і Q, великі значення R
Для динамічних систем: великі значення F і Q, малі значення R

Фільтр показав високу ефективність у зменшенні шуму при правильному налаштуванні параметрів. При цьому важливо забезпечити достатній час моделювання для стабілізації роботи фільтра та враховувати рівень шуму при виборі параметрів.
