import { readFile, writeFile } from "node:fs/promises";
import { resources, validTree } from "../lib/content";

const documents = await Promise.all(
  Object.entries(resources).map(async ([resource, file]) => {
    const data = JSON.parse(await readFile(`content/${file}`, "utf8"));
    if (!validTree(data)) throw new Error(`Invalid content: ${file}`);
    return { path: `/${resource}`, data };
  }),
);
const archive = {
  format: "leafplus-project",
  formatVersion: 1,
  sourceProject: "JeremyZoerman.com",
  exportedAt: new Date().toISOString(),
  documents,
};
await writeFile(
  "leafplus-project.json",
  `${JSON.stringify(archive, null, 2)}\n`,
);
console.log(
  `Packaged ${documents.length} documents in leafplus-project.json. Import with existing-path overwrite disabled to preserve remote edits.`,
);
