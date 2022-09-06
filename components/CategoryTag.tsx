export default function CategoryTag({ category }: {category: string}) {
  return (
    <div className="category-tag">
      <span className="category Caption1SMedium">{category}</span>
      <style jsx>{`
        .category-tag {
          height: 24px;
          flex-grow: 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 10px;
          padding: 0 10px;
          border-radius: 8px;
          background-color: var(--primary-p-100);
        }
        .category {
          height: 18px;
          flex-grow: 0;
          text-align: center;
          color: var(--primary-primary);
        }
      `}</style>
    </div>
  );
}
