import * as fs from 'fs';

const findMarkerInStream = async (stream: fs.ReadStream, packetSize: number) =>
  new Promise<number>(res => {
    let charCounter = 0;
    const markerFocus = new Array<string>();
    stream
      .on('readable', () => {
        let char;
        let markerFound = false;
        while (!markerFound && null !== (char = stream.read(1))) {
          charCounter++;
          if (markerFocus.length === packetSize) {
            markerFocus.shift(); // remove first element
            markerFocus.push(char); // push new char to end
            if (new Set(markerFocus).size === markerFocus.length) {
              markerFound = true;
              stream.destroy();
            }
          } else {
            markerFocus.push(char); // push new char to end
          }
        }
      })
      .on('close', () => {
        res(charCounter);
      });
  });

export const getNumberOfCharactersToFirstMarker = async (
  path: string,
  packetSize: number
): Promise<number> => {
  const readable = fs.createReadStream(path, {
    encoding: 'utf8',
  });

  const number = await findMarkerInStream(readable, packetSize);

  return number;
};
