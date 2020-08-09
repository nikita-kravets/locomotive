/**
 * OpenJSCAD
 *
 * Steam Locomotive # 409
 * Designed by Nikita Kravets (fall 2019)
 *
 * (Test with https://openjscad.org/)
 */

/**
 * Change resolution parameter for better model quality.
 * Resolution rendering speed: 16 - fast, 32 - medium, 64 - slow, >=96 for fast computers
 */

let config = {
    first: 3,
    second: 11.25,
    third: 19.5,
    resolution: 32
};

function main() {
    return translateTop([steamBase(),
        steamWheel().rotateY(180).rotateX(90).translate([config.first, -1.2, 1]),
        steamWheel().rotateX(90).translate([config.first, 7.2, 1]),
        steamWheel().rotateY(180).rotateX(90).translate([config.second, -1.2, 1]),
        steamWheel().rotateX(90).translate([config.second, 7.2, 1]),
        steamWheel().rotateY(180).rotateX(90).translate([config.third, -1.2, 1]),
        steamWheel().rotateX(90).translate([config.third, 7.2, 1]),
        steamTank().translate([8.2, 3, 4]),
        steamCabin().translate([-1, -2, 1.5]),
        steamDoor().translate([-1.1, 0.5, 2.17]),
        steamPusher(),
        steamPusher().mirroredY().translate([0, 6, 0]),
        torch().translate([0, 0, 0.1]),
        smallTorch(),
        smallTorch().translate([0, 3.995, 0]),
        doorCushion(),
        steamBackReflector(),
        rails()
    ]);
}

//just fix scene position top
function translateTop(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i] = elements[i].translate([0, 0, 3.3]);
    }
    return elements;
}

function sleeper() {
    return cube({
        center: [0, 0, 0],
        round: true,
        roundradius: 0.05,
        radius: 0.05,
        size: [1.4, 10, 0.8]
    }).setColor(139 / 255, 90 / 255, 43 / 255);
}

function rail() {
    return union(
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [30, 0.3, 0.6]
        }).translate([0, 0.1, 0]),
        cube({
            center: [0, 0, 0.5],
            round: true,
            roundradius: 0.05,
            radius: 0.05,
            size: [30.05, 0.5, 0.15]
        }),
        cube({
            center: [0, 0, 0.5],
            round: true,
            roundradius: 0.05,
            radius: 0.05,
            size: [30.05, 0.45, 0.15]

        }).translate([0, 0.03, 0.6])
    ).setColor(0.32, 0.32, 0.32);
}

function rails() {
    let width = 7.55;
    return union(
        rail().translate([0, -0.05, 0]),
        rail().translate([0, width, 0]),
        sleeper().translate([0.5, -1, -0.78]),
        sleeper().translate([4, -1, -0.78]),
        sleeper().translate([7.5, -1, -0.78]),
        sleeper().translate([11, -1, -0.78]),
        sleeper().translate([14.5, -1, -0.78]),
        sleeper().translate([18, -1, -0.78]),
        sleeper().translate([21.5, -1, -0.78]),
        sleeper().translate([25, -1, -0.78]),
        sleeper().translate([28.5, -1, -0.78])
    ).translate([-3, -1, -2.6]);
}

function steamBackReflector() {
    return union(
        CSG.cylinder({
            start: [-1, -1.2, 10.3], end: [-1.1, -1.2, 10.3],
            radius: 0.4, resolution: config.resolution
        }).setColor(1, 1, 1),
        CSG.cylinder({
            start: [-1, -1.2, 10.3], end: [-1.11, -1.2, 10.3],
            radius: 0.3, resolution: config.resolution
        }).setColor(1, 0, 0)
    );
}

function doorCushion() {
    return union(
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.7, 0.6, 9]
        }).translate([-1.7, 5.62, 2]),
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.7, 0.6, 9]
        }).translate([-1.7, -0.25, 2]),
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.7, 6, 0.6]
        }).translate([-1.7, 0, 10.4]),
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.3, 1, 9]
        }).translate([-1.7, 5.45, 2]),
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.3, 1, 9]
        }).translate([-1.7, -0.45, 2]),
        cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [0.3, 6.9, 1]
        }).translate([-1.7, -0.45, 10.4])
    ).setColor(0.1, 0.1, 0.1);
}

function steamDoor() {
    return union(
        difference(
            cube({
                center: [0, 0, 0], size: [0.2, 4.99
                    , 8.3], resolution: config.resolution
            }).setColor(0, 0.55, 0.2),
            CSG.roundedCube({
                center: [0, 2.5, 5], roundradius: 0.1, radius: [0.2, 1.5
                    , 2.3], resolution: config.resolution
            })
        ).setColor(0, 0.55, 0.2),
        CSG.roundedCube({
            center: [0, 2.5, 5], roundradius: 0.1, radius: [0.1, 1.5
                , 2.3], resolution: config.resolution
        }).setColor(0, 0, 0, 0.2),
        union(
            CSG.cylinder({
                start: [0, 0, 0], end: [0, 0, 1],
                radius: 0.1, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [0, 0, 3.7], end: [0, 0, 4.7],
                radius: 0.1, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [0, 0, 7.3], end: [0, 0, 8.3],
                radius: 0.1, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [0, 4.5, 4], end: [-0.2, 4.5, 4],
                radius: 0.1, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [-0.2, 3.8, 4], end: [-0.2, 4.6, 4],
                radius: 0.1, resolution: config.resolution
            })
        ).setColor(0.5, 0.5, 0.5)
    )
}

function smallTorch() {
    return union(
        difference(
            CSG.cylinder({
                start: [24.3, 3, 8.1], end: [24.2, 3, 8.1],
                radius: 0.99, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [24.3, 3, 8.1], end: [24.2, 3, 8.1],
                radius: 0.94, resolution: config.resolution
            })
        ).setColor(1, 1, 1),
        torch()
    ).scale([0.5, 0.5, 0.5]).translate([12.8, -0.5, -2.3]);
}

function torch() {
    return union(
        difference(
            CSG.cylinder({
                start: [24.3, 3, 8.1], end: [23, 3, 8.1],
                radius: 1, resolution: config.resolution
            }),
            CSG.sphere({center: [24, 3, 8.1], radius: 0.95, resolution: config.resolution})
        ).setColor(0.2, 0.2, 0.2),
        CSG.sphere({center: [23.5, 3, 8.1], radius: 0.4, resolution: config.resolution}).setColor(1, 1, 1, 0.5),
        CSG.cylinder({
            start: [24.3, 3, 8.1], end: [24.2, 3, 8.1],
            radius: 0.88, resolution: config.resolution
        }).setColor(1, 1, 1, 0.2),
        CSG.cylinder({
            start: [23.8, 3, 6], end: [23.8, 3, 7.11],
            radius: 0.1, resolution: config.resolution
        }).setColor(0.2, 0.2, 0.2),

        CSG.cylinder({
            start: [23.3, 3, 6], end: [23.3, 3, 7.11],
            radius: 0.1, resolution: config.resolution
        }).setColor(0.2, 0.2, 0.2)
    );
}

function steamPusher() {
    return union(union(
        CSG.cylinder({
            start: [0, 0, 0], end: [0, 0, 2],
            radius: 1.1, resolution: config.resolution
        }),
        cube({center: [-1, 0, 0], size: [2.2, 1.8, 2], resolution: config.resolution}),
        CSG.cylinder({
            start: [0, 1.8, 0], end: [0, 1.8, 2],
            radius: 1.1, resolution: config.resolution
        })
        ).rotateX(90).rotateZ(90).translate([22.65, 6.8, 0.5]).setColor(0, 0.6, 0.2),
        CSG.cylinder({
            start: [24, 7.4, 2.3], end: [21, 7.4, 2.3],
            radius: 0.11, resolution: config.resolution
        }).setColor(0, 0, 0),
        CSG.cylinder({
            start: [24.8, 7.4, 1.1], end: [21.8, 7.4, 1.1],
            radius: 0.11, resolution: config.resolution
        }).setColor(0, 0, 0),
        CSG.cylinder({
            start: [21, 7.3, 2.3], end: [21, 7.52, 2.3],
            radius: 0.31, resolution: config.resolution
        }).setColor(0, 0, 0),
        CSG.cylinder({
            start: [21, 7.52, 2.3], end: [21, 8, 2.3],
            radius: 0.21, resolution: config.resolution

        }).setColor(1, 1, 1),
        CSG.cylinder({
            start: [22, 7.65, 1.8], end: [22, 7.65, 0.5],
            radius: 0.11, resolution: config.resolution
        }).rotateY(-30).translate([2.93, 0.2, -10.4
        ]).setColor(0, 0, 0),

        CSG.cylinder({
            start: [21.7, 7.52, 0.11], end: [21.7, 8, 0.11],
            radius: 0.21, resolution: config.resolution

        }).setColor(1, 1, 1).translate([0, 0, 1]),

        CSG.cylinder({
            start: [21.7, 7.52, 0.11], end: [21.7, 7.8, 0.11],
            radius: 0.21, resolution: config.resolution

        }).setColor(1, 1, 1).translate([-8.5, 0, 0]),
        CSG.cylinder({
            start: [21.7, 7.3, 0.11], end: [21.7, 7.52, 0.11],
            radius: 0.31, resolution: config.resolution
        }).setColor(0, 0, 0).translate([0, 0, 1]),
        CSG.cylinder({
            start: [21.7, 7.3, 0.11], end: [21.7, 7.52, 0.11],
            radius: 0.31, resolution: config.resolution
        }).setColor(0, 0, 0).translate([-8.5, 0, 0]),
        CSG.cube({
            corner1: [21.5, 7.5, 0.8],
            corner2: [12.85, 7.65, 1.36]
        }).rotateY(-6.7).translate([0.5, 0.1, -2.47]).setColor(1, 0.9, 0),

        CSG.cylinder({
            start: [21.7, 7.6, 0.11], end: [21.7, 7.75, 0.11],
            radius: 0.3, resolution: config.resolution

        }).setColor(1, 0.9, 0).translate([-8.5, 0, 0]),

        CSG.cylinder({
            start: [21.7, 7.6, 0.11], end: [21.7, 7.75, 0.11],
            radius: 0.3, resolution: config.resolution

        }).setColor(1, 0.9, 0).translate([0, 0, 1]),

        CSG.cube({corner1: [21.5, 7.35, -0.2], corner2: [5, 7.5, 0.36]}).setColor(0, 0, 0),
        CSG.cylinder({
            start: [21.7, 7.1, 0.11], end: [21.7, 7.52, 0.11],
            radius: 0.4, resolution: config.resolution

        }).setColor(1, 1, 1),
        CSG.cylinder({
            start: [21.7, 7.1, 0.11], end: [21.7, 7.52, 0.11],
            radius: 0.4, resolution: config.resolution

        }).setColor(1, 1, 1).translate([-8.5, 0, 0]),
        CSG.cylinder({
            start: [21.7, 7.1, 0.11], end: [21.7, 7.52, 0.11],
            radius: 0.4, resolution: config.resolution

        }).setColor(1, 1, 1).translate([-16.5, 0, 0]),
        CSG.cylinder({
            start: [24.7, 7.4, 2.3], end: [24.5, 7.4, 2.3],
            radius: 0.45, resolution: config.resolution
        }).setColor(1, 0.9, 0, 1),
        CSG.cylinder({
            start: [24.71, 7.4, 2.3], end: [24.5, 7.4, 2.3],
            radius: 0.2, resolution: config.resolution
        }).setColor(1, 1, 1),
        difference(
            CSG.cylinder({
                start: [24.72, 7.4, 2.3], end: [24.5, 7.4, 2.3],
                radius: 0.12, resolution: config.resolution
            }),
            CSG.cylinder({
                start: [24.72, 7.4, 2.3], end: [24.5, 7.4, 2.3],
                radius: 0.11, resolution: config.resolution
            })
        ).setColor(0.3, 0.3, 0.3),

        CSG.cylinder({
            start: [24.7, 7.4, 1.1], end: [24.5, 7.4, 1.1],
            radius: 0.45, resolution: config.resolution
        }).setColor(1, 0.9, 0, 1),
        CSG.cylinder({
            start: [24.71, 7.4, 1.1], end: [24.5, 7.4, 1.1],
            radius: 0.2, resolution: config.resolution
        }).setColor(1, 1, 1)
    );
}

function steamWheelGap(rotZ = 0) {
    const a = 20;
    const len_x = 2.2;
    return linear_extrude({height: 1.2}, polygon([[0, 0],
        [len_x, 0], [len_x * cos(a), -len_x * sin(a)]])).rotateZ(rotZ);
}

function steamWheel() {
    return difference(union(difference(
        CSG.cylinder({
            start: [0, 0, 0], end: [0, 0, 0.8],
            radiusStart: 2.95, radiusEnd: 3, resolution: config.resolution
        }),
        steamWheelGap(),
        steamWheelGap(30),
        steamWheelGap(60),
        steamWheelGap(90),
        steamWheelGap(120),
        steamWheelGap(150),
        steamWheelGap(180),
        steamWheelGap(210),
        steamWheelGap(240),
        steamWheelGap(270),
        steamWheelGap(300),
        steamWheelGap(330)
        ).setColor(0.5, 0.5, 0.55), CSG.cylinder({
            start: [0, 0, -0.05],
            end: [0, 0, 1],
            radius: 1,
            resolution: config.resolution
        }).setColor(0.9, 0, 0.0),
        difference(CSG.cylinder({start: [0, 0, 0.7], end: [0, 0, 0.8], radius: 3.1, resolution: config.resolution}),
            CSG.cylinder({start: [0, 0, 0.7], end: [0, 0, 0.8], radius: 2.4, resolution: config.resolution})
        ).setColor(1, 1, 1)),
        CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0, 1.5],
            radius: 0.5,
            resolution: config.resolution
        }));
}

function steamBase() {
    return union(cube({
            center: [0, 0, 0],
            round: true,
            roundradius: 0.1,
            radius: 0.1,
            size: [25.5, 6.2, 2]
        }).translate([-1.5, -0.1, 0]).setColor(0.2, 0.2, 0.2),
        CSG.cylinder({
            start: [config.first, -1.3, 1],
            end: [config.first, 7.3, 1],
            radius: 0.5,
            resolution: config.resolution
        }).setColor(0.2, 0.2, 0.2),
        CSG.cylinder({
            start: [config.second, -1.3, 1],
            end: [config.second, 7.3, 1],
            radius: 0.5,
            resolution: config.resolution
        }).setColor(0.2, 0.2, 0.2),
        CSG.cylinder({
            start: [config.third, -1.3, 1],
            end: [config.third, 7.3, 1],
            radius: 0.5,
            resolution: config.resolution
        }).setColor(0.2, 0.2, 0.2),
        steamBufferBar().translate([24, 0.5, 0.2]),
        steamBufferBar().mirroredZ().mirroredX().translate([-0.3, 0.5, 1]),
        torus({ri: 0.15, ro: 0.5, resolution: config.resolution}).translate([-1.5, 3, 0.5]).setColor(0.1, 0.1, 0.1)
    );
}

function numShield() {
    let l = vector_text(0, 0, "409");
    let o = [];
    l.forEach(function (pl) {
        o.push(rectangular_extrude(pl, {w: 2, h: 2}));
    });
    return union(o).scale(0.035).rotateX(90).rotateZ(90).translate([17.15, -1.05, -0.35]).setColor(1, 1, 1);
}

function steamTank() {
    return union(CSG.cylinder({
            start: [0, 0, 0],
            end: [16, 0, 0],
            radius: 3,
            resolution: config.resolution
        }).setColor(0, 0.6, 0.2),
        union(
            difference(
                CSG.sphere({center: [14.3, 0, 0], radius: 3, resolution: config.resolution}),
                CSG.roundedCube({
                    center: [17, 0, 0],
                    roundradius: 0.15,
                    radius: [1.2, 1.2, 0.8],
                    resolution: config.resolution
                })
            ),
            CSG.roundedCube({
                center: [16.98, 0, 0],
                roundradius: 0.15,
                radius: [0.2, 1.2, 0.8],
                resolution: config.resolution
            })
        ).setColor(0.2, 0.2, 0.2),
        steamTube().translate([13, 0, 2.5]),
        steamWhistle().translate([5, 0, 1.5]),
        new CSG.Path2D([[-9.1, 3]], false).appendPoints([[15.9, 3]]).rectangularExtrude(0.1, 0.1, 0.1, true).setColor(1, 0.9, 0, 1),
        new CSG.Path2D([[-9.1, -3]], false).appendPoints([[15.9, -3]]).rectangularExtrude(0.1, 0.1, 0.1, true).setColor(1, 0.9, 0, 1),
        CAG.circle({
            center: [0, 0],
            radius: 3.1,
            resolution: config.resolution
        }).extrude({offset: [0, 0, 0.1]}).rotateX(90).rotateZ(90).translate([15.9, 0, 0]).setColor(1, 0.9, 0, 1),
        CAG.circle({
            center: [0, 0],
            radius: 3.1,
            resolution: config.resolution
        }).extrude({offset: [0, 0, 0.1]}).rotateX(90).rotateZ(90).translate([9.9, 0, 0]).setColor(1, 0.9, 0, 1),
        CAG.circle({
            center: [0, 0],
            radius: 2.5,
            resolution: config.resolution
        }).extrude({offset: [0, 0, 0.1]}).rotateX(90).rotateZ(90).translate([-0.1, 0, 0]).setColor(0, 0, 0),
        CSG.roundedCube({
            center: [16.9, 0, 0],
            roundradius: 0.05,
            radius: [0.2, 1.2, 0.8],
            resolution: config.resolution
        }).translate([-16.9, 0, 0]).setColor(0.2, 0.2, 0.2),
        numShield()
    );
}

function steamTube() {
    return difference(union(CSG.cylinder(
        {start: [0, 0, 0], end: [0, 0, 5], radiusStart: 1.2, radiusEnd: 1.5, resolution: config.resolution}),
        CSG.cylinder({
            start: [0, 0, 4],
            end: [0, 0, 5],
            radiusStart: 1.6,
            radiusEnd: 1.6,
            resolution: config.resolution
        })
    ), CSG.cylinder({
        start: [0, 0, 0],
        end: [0, 0, 5],
        radius: 0.85,
        resolution: config.resolution
    })).setColor(0, 0.6, 0.2);
}

function steamWhistle() {
    return union(
        CSG.cylinder(
            {start: [0, 0, 0], end: [0, 0, 3], radius: 1.2, resolution: config.resolution}),
        CSG.sphere({
            center: [0, 0, 3],
            radius: 1.2, resolution: config.resolution
        }),
        CSG.sphere({
            center: [0, 0, 4.2],
            radius: 0.2, resolution: config.resolution
        })
    ).setColor(0, 0.6, 0.2);
}

function steamBuffer() {
    return union(
        CSG.cylinder({
            start: [0, 0, 0], end: [1, 0, 0], radius: 0.38, resolution: config.resolution
        }),
        CSG.cylinder({
            start: [1, 0, 0], end: [1.2, 0, 0], radius: 0.65, resolution: config.resolution
        })
    ).setColor(0.2, 0.2, 0.2);
}

function steamBufferBar() {
    return union(
        cube({center: [0, 0, 0], size: [0.8, 5, 0.8], resolution: config.resolution}).setColor(0.9, 0, 0),
        steamBuffer().translate([0.8, 1, 0.4]),
        steamBuffer().translate([0.8, 4, 0.4])
    );
}

function steamCabin() {
    return union(union(difference(
        cube({center: [0, 0, 0], size: [10, 10, 10], resolution: config.resolution}),
        cube({center: [0, 0, 0], size: [10, 3, 4], resolution: config.resolution}).translate([0, -1, 0]),
        cube({center: [0, 0, 0], size: [10, 3, 4], resolution: config.resolution}).translate([0, 8, 0]),
        cube({center: [0, 0, 0], size: [0.2, 2.5, 3], resolution: config.resolution}).translate([9.9, 0.75, 5.5]),
        cube({center: [0, 0, 0], size: [0.2, 2.5, 3], resolution: config.resolution}).translate([9.9, 6.75, 5.5]),
        cube({center: [0, 0, 0], size: [9.9, 5, 9], resolution: config.resolution}).translate([0, 2.5, 0]),
        cube({center: [0, 0, 0], size: [9.7, 9.8, 5.8], resolution: config.resolution}).translate([0.2, 0.1, 4.1]),
        CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0.2, 0],
            radius: 2,
            resolution: config.resolution
        }).translate([5, -0.1, 6.7]),
        CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0.2, 0],
            radius: 2,
            resolution: config.resolution
        }).translate([5, 9.9, 6.7])
        ),
        difference(
            CSG.cylinder({
                start: [0, 0, 0],
                end: [11, 0, 0],
                radius: 12,
                resolution: config.resolution
            }).translate([0, 5.5, 0]),
            cube({center: [0, 0, 0], size: [11, 24, 23], resolution: config.resolution}).translate([0, -6.5, -13])
        ).translate(-0.5, 0, 0)).setColor(0, 0.6, 0.2),
        cube({
            center: [0, 0, 0],
            size: [0.2, 2.5, 3],
            resolution: config.resolution
        }).translate([9.9, 0.75, 5.5]).setColor(0.2, 0.21, 0.25, 0.3),
        cube({
            center: [0, 0, 0],
            size: [0.2, 2.5, 3],
            resolution: config.resolution
        }).translate([9.9, 6.75, 5.5]).setColor(0.2, 0.21, 0.25, 0.3),
        difference(CAG.roundedRectangle({
                center: [0, 0],
                radius: [1.4, 1.65],
                roundradius: 0.2,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.2]}),
            CAG.roundedRectangle({
                center: [0, 0],
                radius: [1.35, 1.6],
                roundradius: 0.17,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.2]})
        ).setColor(1, 0.9, 0, 1).rotateZ(90).rotateY(90).translate([9.9, 7.98, 7]),
        difference(CAG.roundedRectangle({
                center: [0, 0],
                radius: [1.4, 1.65],
                roundradius: 0.2,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.2]}),
            CAG.roundedRectangle({
                center: [0, 0],
                radius: [1.35, 1.6],
                roundradius: 0.17,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.2]})
        ).setColor(1, 0.9, 0, 1).rotateZ(90).rotateY(90).translate([9.9, 1.98, 7]),
        CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0.2, 0],
            radius: 2,
            resolution: config.resolution
        }).translate([5, -0.1, 6.7]).setColor(0.2, 0.21, 0.25, 0.3),
        CSG.cylinder({
            start: [0, 0, 0],
            end: [0, 0.2, 0],
            radius: 2,
            resolution: config.resolution
        }).translate([5, 9.9, 6.7]).setColor(0.2, 0.21, 0.25, 0.3),
        difference(CAG.circle({
                center: [0, 0],
                radius: 2.2,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.2]}),
            CAG.circle({center: [0, 0], radius: 2.1, resolution: config.resolution}).extrude({offset: [0, 0, 0.2]}))
            .rotateX(90).translate([5, 0.1, 6.7]).setColor(1, 0.9, 0, 1),
        difference(CAG.circle({
                center: [0, 0],
                radius: 2.2,
                resolution: config.resolution
            }).extrude({offset: [0, 0, 0.1]}),
            CAG.circle({center: [0, 0], radius: 2.1, resolution: config.resolution}).extrude({offset: [0, 0, 0.2]}))
            .rotateX(90).translate([5, 10.1, 6.7]).setColor(1, 0.9, 0, 1)
    );
}
