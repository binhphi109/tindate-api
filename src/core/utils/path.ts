/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import { isArray, union, isString } from "lodash";
import { sync } from "glob";

export const getGlobbedPaths = (globPatterns: string | Array<string>, excludes?: string) => {
  // URL paths regex
  const urlRegex = /^(?:[a-z]+:)?\/\//i;

  // The output array
  let output: Array<string> = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          if (isArray(excludes)) {
            for (const i in excludes) {
              file = file.replace(excludes[i], "");
            }
          } else {
            file = file.replace(excludes, "");
          }
          return file;
        });
      }
      output = union(output, files);
    }
  }

  return output;
};
