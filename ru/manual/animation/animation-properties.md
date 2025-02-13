# Свойства анимации

<span class="label label-doc-level">Сложность / Легкая</span>
<span class="label label-doc-audience">Область / Дизайн</span>

После того как вы [испортировали анимацию](import-animations.md), вы можете выбрать в **Asset View** (в нижней панели по умолчанию) и просматривать и редактировать свои свойства в **Property Grid** (справа по умолчанию).

![Ассеты в Asset View](media/assets-in-asset-view1.png)

![Свойства](media/animations-properties.png)

## Источник

Исходный файл, используемый анимацией. Если вы измените это, Game Studio повторно импортирует анимацию.

## Продолжительность клипа

По умолчанию продолжительность клипа отключена. Это означает, что анимация начинается в Frame 0 и работает до последнего написанного ключа в файле.

Тем не менее, одиночные анимационные треки иногда включают несколько анимаций. В этом случае вы должны разделить трек. Для этого включить **Clip duration** и настроить **start** и **end** кадры чтобы соответствовать продолжительности каждой анимации.

Начальные и конечные рамки по прежнему ограничены ключевыми фреймами, экспортируемыми в файле. Например, если вы изначально экспортировали кадры с 20 по 40 из инструмента анимации, начальный кадр не может быть ниже 20, а конечный кадр не может быть выше 40.

По умолчанию, Game Studio предполагает, что частота кадров составляет 30. Вы можете изменить это в **Game settings** настройках ассета в **Editor settings > Animation frame rate**.
 
## Якорь поворота (Pivot)

Game Studio assumes the pivot is the origin of the coordinate system local to the animation. It should be set to `(0, 0, 0)`. If your animation was shifted from the origin when exported, you can use this property to re-adjust it.

Game Studio предполагает, что Pivot является происхождением системы координат, локальной для анимации. Это должно быть установлено на `(0, 0, 0)`.Если ваша анимация была смещена отностительно центра при экспорте, вы можете использовать это свойство, чтобы повторно настроить центр.

## Масштаб импорта (Import scale)

Масштаб импорта должен быть установлен на `1`. Stride обнаруживает единицы, в которых ваши данные были экспортированы, и автоматически настраивает их. Если в вашей анимации нет настройки экспорта, а масштаб является неверным, вы можете использовать свойство импорта Scale для повторной настройки.

## Режимы анимации (Repeat mode)

Вы можете выбрать **PlayOnce**, **LoopInfinite** или **PlayOnce&Hold**. Это просто *подсказка* для Stride. При применении вы можете указать по различные варианты. Если вы не указаете режим позже, Stride использует атрибут, который вы устанавливаете здесь по умолчанию.
 
## Тип (Type)

Stepride поддерживает два типа анимационного клипа. Стандартная анимации по умолчанию **Animation clip** и используются с линейным смешиванием. Для **Difference clip**, доступно ещё несколько настроек. Для получения дополнительной информации см. [Аддитивная анимация](additive-animation.md).

## Скелет (Skeleton)

Если вы хотите анимировать кости / суставы, анимация нуждается в скелете.

Скелеты сделаны из костей, которые образуют иерархию. Когда родительские кости меняют свою позицию, они также влияют на позиции дочерних костей. Например, кость руки может иметь пять дочерних костей (пальцы руки как у читающего); Когда рука движется вверх и вниз, пальцы и большой палец движутся вместе с ней.

Убедитесь, что вы ссылаетесь на тот же скелет, который использовался моделью, которую вы хотите анимировать. Если в вашей анимации и целевом скелете не хватает костей или есть другие различия между иерархией кости / сустава скелета, Stride перестроит скелет как можно ближе к анимации.

>[!NOTE]
>В настоящее время нет способа визуализировать скелеты в Game Studio.

## Корневое движение

Когда корневое движение включено, Stride применяет **root node animation** к [TransformComponent](xref:Stride.Engine.TransformComponent) сущности, в которую вы добавляете анимацию, вместо того, чтобы применять ее к скелету.

Это полезно, например, для анимирования сущностей, которые не требуют скелетов, таких как [направленный свет](../graphics/lights-and-shadows/spot-lights.md) двигающийся вперёд назад.

>[!Note]
>Если в анимации нет скелета, указанного в **Skeleton**, Stride всегда применяет анимацию к [TransformComponent](xref:Stride.Engine.TransformComponent), даже если **root motion** отключено.

>[!Note]
>[TransformComponent](xref:Stride.Engine.TransformComponent) применяет смещение в позицию узела модели. Если вы не хотите добавлять смещение, убедитесь, что[TransformComponent](xref:Stride.Engine.TransformComponent) выствален в `0,0,0`.

## Импорт пользовательских аттрибутов

Если у вас есть пользовательский атрибут в файле анимации ...  

>[!Note]
> а нет ничего дальше в оригинальной документации. умываю руки

## Смотрите так же

* [Импорт анимации](import-animations.md)
* [Свойства анимации](animation-properties.md)
* [Настройка анимации](set-up-animations.md)
* [Предпросмотр анимации](preview-animations.md)
* [Скрипты анимации](animation-scripts.md)
* [Аддитивная анимация](additive-animation.md)
* [Процедурная анимация](procedural-animation.md)
* [Пользовательские деревья смешивания](custom-blend-trees.md)
* [Связи узлов моделей](model-node-links.md)
* [Пользовательские аттрибуты](custom-attributes.md)