export type GenreCard = {
  style: string;
  instruments: string[];
  notableArtists: string[];
  albums: string[];
};

export type TreeNode = {
  id: string;
  parentId: string | null;
  title: string;
  style: string;
  audioPath: string;
  card: GenreCard;
};

export type TreeData = {
  melody: {
    id: string;
    title: string;
    titleEn: string;
  };
  nodes: TreeNode[];
};
