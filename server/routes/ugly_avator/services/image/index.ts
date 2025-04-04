import { getImageData } from './image'

interface ISvg {
  rng: () => number
  bgColor: string
  height: number
  width: number
  opacity: number
}

export const getSvg = async ({
  rng,
  bgColor,
  height,
  width,
  opacity
}: ISvg) => {
  const data = getImageData({ rng, bgColor, height, width, opacity })

  // 直接构建SVG字符串
  const svgData = `<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" width="${
    width || 200
  }" height="${height || 200}" id="face-svg">
  <defs>
    <clipPath id="leftEyeClipPath">
      <polyline points="${data.eyeLeftCountour}" />
    </clipPath>
    <clipPath id="rightEyeClipPath">
      <polyline points="${data.eyeRightCountour}" />
    </clipPath>

    <filter id="fuzzy">
      <feTurbulence id="turbulence" baseFrequency="0.05" numOctaves="3" type="noise" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
    </filter>
    <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color: ${
        data.hairColors[Math.floor(data.rng() * 10)]
      };  stop-opacity: 1" />
      <stop offset="${data.dyeColorOffset}" style="stop-color: ${
    data.hairColors[Math.floor(data.rng() * data.hairColors.length)]
  };  stop-opacity: 1" />
      <stop offset="100%" style="stop-color: ${
        data.hairColors[Math.floor(data.rng() * data.hairColors.length)]
      };  stop-opacity: 1" />
    </linearGradient>
  </defs>
  <title>That's an ugly face</title>
  <desc>CREATED BY XUAN TANG, MORE INFO AT TXSTC55.GITHUB.IO</desc>
  <rect x="-100" y="-100" width="100%" height="100%" opacity="${opacity}" fill="${
    bgColor ||
    data.backgroundColors[Math.floor(data.rng() * data.backgroundColors.length)]
  }" />
  <polyline id="faceContour" points="${
    data.computedFacePoints
  }" fill="#ffc9a9" stroke="black"
    stroke-width="${
      3.0 / data.faceScale
    }" stroke-linejoin="round" filter="url(#fuzzy)" />

  <g transform="translate(${
    data.center[0] + data.distanceBetweenEyes + data.rightEyeOffsetX
  } ${-(-data.center[1] + data.eyeHeightOffset + data.rightEyeOffsetY)})">
    <polyline id="rightCountour" points="${
      data.eyeRightCountour
    }" fill="white" stroke="white"
      stroke-width="${
        0.0 / data.faceScale
      }" stroke-linejoin="round" filter="url(#fuzzy)" />
  </g>
  <g transform="translate(${-(
    data.center[0] +
    data.distanceBetweenEyes +
    data.leftEyeOffsetX
  )} ${-(-data.center[1] + data.eyeHeightOffset + data.leftEyeOffsetY)})">
    <polyline id="leftCountour" points="${
      data.eyeLeftCountour
    }" fill="white" stroke="white" stroke-width="${0.0 / data.faceScale}"
      stroke-linejoin="round" filter="url(#fuzzy)" />
  </g>
  <g transform="translate(${
    data.center[0] + data.distanceBetweenEyes + data.rightEyeOffsetX
  } ${-(-data.center[1] + data.eyeHeightOffset + data.rightEyeOffsetY)})">
    <polyline id="rightUpper" points="${
      data.eyeRightUpper
    }" fill="none" stroke="black" stroke-width="${3.0 / data.faceScale}"
      stroke-linejoin="round" filter="url(#fuzzy)" />
    <polyline id="rightLower" points="${
      data.eyeRightLower
    }" fill="none" stroke="black" stroke-width="${4.0 / data.faceScale}"
      stroke-linejoin="round" filter="url(#fuzzy)" />
    ${Array(10)
      .fill(0)
      .map(
        (_, i) =>
          `<circle r="${data.rng() * 2 + 3.0}" cx="${
            data.rightPupilShiftX + data.rng() * 5 - 2.5
          }"
      cy="${
        data.rightPupilShiftY + data.rng() * 5 - 2.5
      }" stroke="black" fill="none" stroke-width="1.0"
      filter="url(#fuzzy)" clip-path="url(#rightEyeClipPath)" />`
      )
      .join('')}
  </g>
  <g transform="translate(${-(
    data.center[0] +
    data.distanceBetweenEyes +
    data.leftEyeOffsetX
  )} ${-(-data.center[1] + data.eyeHeightOffset + data.leftEyeOffsetY)})">
    <polyline id="leftUpper" points="${
      data.eyeLeftUpper
    }" fill="none" stroke="black" stroke-width="${4.0 / data.faceScale}"
      stroke-linejoin="round" filter="url(#fuzzy)" />
    <polyline id="leftLower" points="${
      data.eyeLeftLower
    }" fill="none" stroke="black" stroke-width="${4.0 / data.faceScale}"
      stroke-linejoin="round" filter="url(#fuzzy)" />
    ${Array(10)
      .fill(0)
      .map(
        (_, i) =>
          `<circle r="${data.rng() * 2 + 3.0}" cx="${
            data.leftPupilShiftX + data.rng() * 5 - 2.5
          }"
      cy="${
        data.leftPupilShiftY + data.rng() * 5 - 2.5
      }" stroke="black" fill="none" stroke-width="1.0"
      filter="url(#fuzzy)" clip-path="url(#leftEyeClipPath)" />`
      )
      .join('')}
  </g>
  <g id="hairs">
    ${data.hairs
      .map(
        (hair, index) =>
          `<polyline points="${hair}" fill="none" stroke="${data.hairColor}"
      stroke-width="2" stroke-linejoin="round" filter="url(#fuzzy)" />`
      )
      .join('')}
  </g>
  ${
    data.rng() > 0.5
      ? `
  <g id="pointNose">
    <g id="rightNose">
      ${Array(10)
        .fill(0)
        .map(
          (_, i) =>
            `<circle r="${data.rng() * 2 + 1.0}" cx="${
              data.rightNoseCenterX + data.rng() * 4 - 2
            }"
        cy="${
          data.rightNoseCenterY + data.rng() * 4 - 2
        }" stroke="black" fill="none" stroke-width="1.0"
        filter="url(#fuzzy)" />`
        )
        .join('')}
    </g>
    <g id="leftNose">
      ${Array(10)
        .fill(0)
        .map(
          (_, i) =>
            `<circle r="${data.rng() * 2 + 1.0}" cx="${
              data.leftNoseCenterX + data.rng() * 4 - 2
            }"
        cy="${
          data.leftNoseCenterY + data.rng() * 4 - 2
        }" stroke="black" fill="none" stroke-width="1.0"
        filter="url(#fuzzy)" />`
        )
        .join('')}
    </g>
  </g>`
      : `
  <g id="lineNose">
    <path d="M ${data.leftNoseCenterX} ${data.leftNoseCenterY}, Q${
          data.rightNoseCenterX
        } ${data.rightNoseCenterY * 1.5},${
          (data.leftNoseCenterX + data.rightNoseCenterX) / 2
        } ${-data.eyeHeightOffset * 0.2}"
      fill="none" stroke="black" stroke-width="3" stroke-linejoin="round" filter="url(#fuzzy)"></path>
  </g>`
  }
  <g id="mouth">
    <polyline points="${
      data.mouthPoints
    }" fill="rgb(215,127,140)" stroke="black" stroke-width="3" stroke-linejoin="round"
      filter="url(#fuzzy)" />
  </g>
</svg>`

  return svgData
}
