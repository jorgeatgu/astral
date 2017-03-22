## Astral

[Astral](https://an.wikipedia.org/wiki/Estral)

<blockquote>
    A estral u astral (d'o latín DEXTRALE, prenunciata as'tɾal~es'tɾal (AFI)) ye una ferramienta emplegata ta fustiar, picar y treballar a fusta en cheneral, consistent d'una fuella u tozuel de fierro u acero de ripa esmolata enchascata sobre un astil de fusta.
</blockquote>

Astral es un **fraken-work** basado e inspirado **fuertemente** en [bascss](http://basscss.com) y [tachyons](http://tachyons.io).

Astral se construye con **postCSS**, incluyendo custom properties, custom selectors y nested para indentar los estados. Nada más. No es [tlhİngan Hol](Idioma_klingon). Solamente es **CSS**.

La nomenclatura que he utilizado para construir Astral se basa en emmet. Las clases siempre van nombradas primero con la propiedad ```margin``` separada con un guión del llamemosle diferenciador ```top right bottom left``` y en último lugar el valor.

La unidad de medida estandar es el **REM**. Para los módulos de width también he incorporado el *%*, y en el height **vh**.

Las unidades con decimales se diferencian a través del doble guión bajo.

```
.letter-0__5 {
  letter-spacing: .5rem;
}
```


Todos los módulos tienen su version responsive. Astral parte desde mobile-first hasta ir subiendo a través de tres breakpoints que atraviesan el móvil, tablet y llegan al desktop.

```

@media only screen and (min-width: 30em) {

  //Para este breakpoint usamos la terminación --s

     .display-ib--s {
        display: inline-block;
      }

}

@media only screen and (min-width: 48em) {

    //Para este breakpoint usamos la terminación --m

      .display-ib--m {
        display: inline-block;
      }

}

@media only screen and (min-width: 64em) {

    //Para este breakpoint usamos la terminación --l

      .display-ib--l {
        display: inline-block;
      }

}

```

Para empezar con Astral

```
git clone https://github.com/jorgeatgu/astral.git
cd astral
npm i
    delay
    delay
    npm finish
gulp
```

Copia, clona, distribuye y destruye como quieras.

Si te atrae esta manera de construir webs elige [bascss](http://basscss.com) o [tachyons](http://tachyons.io).

# Contribuye

Si crees que falta algo no dudes en hacer un fork y mandar un pull request con lo que creas que hace falta. También puedes abrir una issue.
