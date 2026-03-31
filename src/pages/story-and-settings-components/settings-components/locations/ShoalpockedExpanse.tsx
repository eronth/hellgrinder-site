import Hx from "../../../../common-design/Hx/Hx";
import { HeaderSize } from "../../../../ts-types/types";

type Props = {
  hx: HeaderSize;
};
export default function ShoalpockedExpanse ({ hx }: Props) {
  const mysteryText = [
    'The network of invisible arcane flows can be “ridden” by those with the right knowledge.',
    'Keepers of passageways and hidden shores can be consulted.',
    'Well read eyes can decipher the text of the Expanse.',
    'Those who listen can hear the Shoals.',
    'The eternal whisper can grow to a shout.',
    'One who offers can be a mouthpiece of secrets.',
    'The veil can be shifted, swapping what is known for what is not.',
    'Secrets yet unpublished can be carved into ones bone.',
    'Secluded study can yield epiphany.',
    'Knowing the language of The Deep Unknown can reveal mystic truths.',
    'Cryptic gestures burn into your retinas until you see them where needed.',
    'Having the unburdened tongue can sort out ambiguous flavors of arcane spells.',
    'Obscure facts become important truths for those who know how to check.',
    'Enigmatic personalities can reveal the person behind the person.',
    'Mysterious drink and mystical food can bring about an understanding yet unfathomed.',
    'Silence speaks the loudest; blindness sees the furthest.',
    'Faith in knowledge is stronger than faith in understanding.',
    'With effort, you can read the pages hidden within pages.',
  ];

  // Two indexes that are not the same.
  const index1 = Math.floor(Math.random() * mysteryText.length);
  let index2 = Math.floor(Math.random() * mysteryText.length);
  while (index1 === index2) {
    index2 = Math.floor(Math.random() * mysteryText.length);
  }

  return (<>
    <Hx hx={hx}>Shoalpocked Expanse</Hx>
    <p>To the untrained eye, the Shoalpocked expanse seems like an empty expanse with distant features far out of reach. As you reach out into the realm of the Vastfathom League, you find you can swim into the emptiness, pushing further from the safety of your “shore” towards whatever distant land draws your gaze.  But this can come at a cost if you enter unprepared. The emptiness pushes against you while it tries to pull you apart. The darkness stings your eyes, the silence pierces your ears, and the endless loneliness gnaws at your mind. You begin to see, hear, and feel things in Deep that aren’t there… or maybe you’re finally noticing what’s been there the whole time.</p>
    <p>
      However, this realm contains so much to those willing to learn the deep
      secrets. {mysteryText[index1]} {mysteryText[index2]} New
      techniques for surviving the vast expanse can be learned and developed by those willing to open their mind.</p>
    <p>Those who delve too deeply into the Expanse meet one of two grisly ends. Some begin to expand and burst. Their arms and legs bloat up before their joints and bones pop, sending fragments everywhere. Shards of bone and flesh tear up their torso and head, as the pressure continues to build. Finally their head bursts, spewing brain matter across the Expanse. Others are crushed bit by bit. First their limbs crumple into a mangled mess, causing them to be unable to change course. As they drift helplessly onward, their torso and torso too begin to collapse, making it impossible to breath. Finally, their head collapses in and they vanish from sight. </p>
    <p>The furthest depths of the Shoalpocked Expanse are unexplored by humans, and it is unknown what knowledge and horrors lie deep within.</p>
  </>)
}
