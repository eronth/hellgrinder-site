type Props = {
  css: string;
};

export default function SingleSpellPage({ css }: Props) {
  return (
    <div className={`spell-page ${css} cormorant-unicase-light`}>
      <div className='spell-name'>
        <div className='spell-name-inner'></div>
      </div>
      <div className='how-to-cast-title'>Ingredients and Instructions</div>
      <div className='how-to-cast'>
        <div className='how-to-cast-inner'></div>
      </div>
      <div className='spell-effects-title'>Outcomes</div>
      <div className='spell-effects'>
        <div className='spell-effects-inner'></div>
      </div>
      <div className='backfire-title'>Grave Forewarnings!</div>
      <div className='backfire'>
        <div className='backfire-inner'></div>
      </div>
    </div>
  )
}