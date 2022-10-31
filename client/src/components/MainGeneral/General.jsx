import React from 'react';
import style from './General.module.scss'
import photo from "../../assets/photo.jpg"
import pic1 from "../../assets/1.jpg"
import pic2 from "../../assets/2.jpg"

const General = () => {
    return (
        <div className={style.general}>
            <section className={style.welcome__images}>
                <img src={pic1} className={style.imagesP}/>
                <div className={style.dzenstyle}>
                    <span className={style.style}>Стиль</span>
                    <span className={style.dzen}>Дзен</span>
                </div>
                <img src={pic2} className={style.imagesP}/>
            </section>
            <section className={style.painter__data}>
                <div className={style.painter__data__photoandname}>
                    <img className={style.image} src={photo}/>
                    <span className={style.hud}>Художник - Р.Х. Абдульмянов</span>
                </div>
                <div className={style.description}>
                    <p>К счастью, мы можем не только слышать о Дзен, но и видеть его. Поскольку "одна
                        демонстрация стоит сотни высказываний", выражение Дзен в искусстве дает нам один из
                        самых прямых способов его понимания. Это тем более важно, что формы искусства, созданные
                        Дзен, не являются символическими, как другие виды буддийского искусства, или как
                        "религиозное" искусство в целом.</p>
                    <p> Любимые предметы дзенских художников, будь то художники или поэты, это то, что мы должны
                        называть естественными, конкретными и мирскими вещами. Даже когда они обращаются к Будде
                        или к патриархам и мастерам Дзен, они изображают их в необычно приземленном и
                        человеческом образе.</p>
                    <p>Более того, искусство Дзен не является просто или главным образом репрезентативным. Даже
                        в живописи произведение искусства рассматривается не только как изображение природы, но
                        и как само произведение природы. Ибо сама техника включает в себя искусство
                        безыскусности, или то, что Сабро Хасэгава назвал "контролируемой случайностью", так что
                        картины формируются так же естественно, как камни и травы, которые они изображают.</p>
                </div>
            </section>
        </div>
    );
};

export default General;