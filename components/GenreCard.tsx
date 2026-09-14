import type { GenreCard as GenreCardData } from "@/lib/types";

function ChipList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function GenreCard({ card }: { card: GenreCardData }) {
  return (
    <article className="folio-card">
      <p className="eyebrow">曲风卡片 / Style card</p>
      <p className="folio-lede">{card.style}</p>
      <section className="folio-section">
        <h3>乐器 / Instruments</h3>
        <ChipList items={card.instruments} />
      </section>
      <section className="folio-section">
        <h3>代表人物 / Notable artists</h3>
        <ChipList items={card.notableArtists} />
      </section>
      <section className="folio-section">
        <h3>参考专辑 / Albums</h3>
        <ChipList items={card.albums} />
      </section>
    </article>
  );
}
