import {withTranslation} from 'next-i18next'

function Language(props){
  const {t, i18n} = props;
  const language = i18n.language

  return(
    <h2>{language}:::{t}</h2>
  )
}

export default withTranslation('common') (Language)