export class File {
  name: string;
  size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }
}

export class Folder {
  name: string;
  parent: Folder | null;
  subFolders: Array<Folder>;
  files: Array<File>;

  constructor(name: string, parent: Folder | null) {
    this.name = name;
    this.parent = parent;
    this.subFolders = [];
    this.files = [];
  }

  getSize = (): number => {
    const folderSize = this.subFolders.reduce(
      (acc, folder) => acc + folder.getSize(),
      0
    );
    const fileSize = this.files.reduce((acc, file) => acc + file.size, 0);
    return folderSize + fileSize;
  };
}
