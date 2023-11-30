void (function () {
  window.addEventListener("load", renderLine);
  function renderLine() {
    const path3D = new Path3D();
    const points = [];
    points.push(newPoint(0, 0));
    points.push(newPoint(5, 5));
    points.push(newPoint(-5, 5));
    // path3D.start();
    path3D.confirm();
    path3D.update(points[0]);
    path3D.update(points[1]);
    path3D.stop();
    path3D.confirm();
    path3D.update(points[2]);
    // path3D.stop();
    // path3D.clear();

    var geometry = new THREE.PathGeometry(128);
    // const imagePath = "images/diffuse.jpg";
    const imagePath = "images/shangxiazuoyouTriangle12.png";
    getTexture(imagePath);
    var params = {
      texture: imagePath,
      color: [88, 222, 222],
      scrollUV: true,
      scrollSpeed: 0.03,
      width: 0.3,
      side: "both",
      cornerRadius: 0.2,
      cornerSplit: 10,
      progress: 1,
      playSpeed: 0.14,
    };

    geometry.update(path3D.getPathPointList(), {
      width: params.width,
      side: params.side,
      arrow: false, //
    });

    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      depthWrite: true,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });

    material.map = getTexture(imagePath);
    line = new THREE.Mesh(geometry, material);
    line.frustumCulled = false;
    scene.add(line);

    setInterval(() => {
      material.map.offset.x -= params.scrollSpeed;
      material.map.repeat.x = 1;
    }, 20);
  }

  function useBox() {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({ color: 0xaa4312 }),
    );
    box.material.transparent = true;
    box.material.opacity = 0.1;
    return box;
  }

  function newPoint(x, z) {
    return new THREE.Vector3(x, 0, z);
  }
})();
