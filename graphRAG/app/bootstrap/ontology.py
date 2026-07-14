from dataclasses import dataclass, field


# ============================================================================
# MODELS
# ============================================================================

@dataclass(frozen=True)
class Responsibility:
    id: str
    name: str


@dataclass(frozen=True)
class Category:
    id: str
    name: str
    aliases: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class Asset:
    id: str
    name: str
    aliases: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class IssueType:
    id: str
    name: str
    aliases: list[str] = field(default_factory=list)


@dataclass(frozen=True)
class Department:
    id: str
    name: str
    responsibilities: list[Responsibility] = field(default_factory=list)
    categories: list[Category] = field(default_factory=list)
    assets: list[Asset] = field(default_factory=list)
    issue_types: list[IssueType] = field(default_factory=list)


@dataclass(frozen=True)
class Ontology:
    departments: list[Department] = field(default_factory=list)


# ============================================================================
# ENGINEERING DEPARTMENT
# ============================================================================

ENGINEERING = Department(

    id="engineering",
    name="Engineering Department",

    responsibilities=[
        Responsibility("road-construction", "Road Construction"),
        Responsibility("road-maintenance", "Road Maintenance"),
        Responsibility("civil-infrastructure", "Civil Infrastructure"),
        Responsibility("bridge-maintenance", "Bridge Maintenance"),
        Responsibility("footpath-maintenance", "Footpath Maintenance"),
        Responsibility("storm-water-drainage", "Storm Water Drainage"),
        Responsibility("drainage-infrastructure", "Drainage Infrastructure"),
        Responsibility("water-supply-infrastructure", "Water Supply Infrastructure"),
        Responsibility("sewerage-infrastructure", "Sewerage Infrastructure"),
        Responsibility("public-buildings", "Public Buildings"),
        Responsibility("government-buildings", "Government Buildings"),
        Responsibility("government-housing", "Government Housing"),
        Responsibility("urban-infrastructure", "Urban Infrastructure"),
        Responsibility("construction-projects", "Construction Projects"),
        Responsibility("public-works", "Public Works"),
    ],

    categories=[
        Category(
            id="roads",
            name="Roads",
            aliases=[
                "road",
                "street",
                "highway",
                "lane",
                "carriageway"
            ]
        ),

        Category(
            id="drainage",
            name="Drainage",
            aliases=[
                "drain",
                "storm drain",
                "storm water drain",
                "drain line"
            ]
        ),

        Category(
            id="water-supply",
            name="Water Supply",
            aliases=[
                "water",
                "pipeline",
                "water line"
            ]
        ),

        Category(
            id="sewerage",
            name="Sewerage",
            aliases=[
                "sewer",
                "sewer line",
                "sewage"
            ]
        ),

        Category(
            id="buildings",
            name="Buildings",
            aliases=[
                "government building",
                "office",
                "public building"
            ]
        )
    ],

    assets=[

        Asset(
            id="road",
            name="Road",
            aliases=[
                "street",
                "roadway",
                "carriageway"
            ]
        ),

        Asset(
            id="footpath",
            name="Footpath",
            aliases=[
                "sidewalk",
                "walkway",
                "pedestrian path"
            ]
        ),

        Asset(
            id="bridge",
            name="Bridge",
            aliases=[
                "flyover",
                "overbridge"
            ]
        ),

        Asset(
            id="culvert",
            name="Culvert",
            aliases=[
                "underpass drain"
            ]
        ),

        Asset(
            id="storm-drain",
            name="Storm Drain",
            aliases=[
                "drain",
                "storm water drain",
                "rain drain"
            ]
        ),

        Asset(
            id="manhole",
            name="Manhole",
            aliases=[
                "manhole cover",
                "drain cover"
            ]
        ),

        Asset(
            id="water-pipeline",
            name="Water Pipeline",
            aliases=[
                "water line",
                "pipe",
                "pipeline"
            ]
        ),

        Asset(
            id="sewer-pipeline",
            name="Sewer Pipeline",
            aliases=[
                "sewer line",
                "sewage line"
            ]
        ),

        Asset(
            id="retaining-wall",
            name="Retaining Wall",
            aliases=[
                "boundary wall"
            ]
        ),

        Asset(
            id="government-building",
            name="Government Building",
            aliases=[
                "office building",
                "public office"
            ]
        )
    ],

    issue_types=[

        IssueType(
            id="pothole",
            name="Pothole",
            aliases=[
                "road hole",
                "big hole in road",
                "broken road"
            ]
        ),

        IssueType(
            id="road-crack",
            name="Road Crack",
            aliases=[
                "cracked road",
                "road split"
            ]
        ),

        IssueType(
            id="road-sinking",
            name="Road Sinking",
            aliases=[
                "sunken road",
                "road cave in"
            ]
        ),

        IssueType(
            id="uneven-road",
            name="Uneven Road Surface",
            aliases=[
                "bumpy road",
                "uneven road"
            ]
        ),

        IssueType(
            id="damaged-divider",
            name="Damaged Road Divider",
            aliases=[
                "broken divider",
                "divider broken"
            ]
        ),

        IssueType(
            id="broken-footpath",
            name="Broken Footpath",
            aliases=[
                "damaged footpath",
                "broken sidewalk"
            ]
        ),

        IssueType(
            id="missing-paver",
            name="Missing Paver Block",
            aliases=[
                "missing tiles",
                "broken paver"
            ]
        ),

        IssueType(
            id="blocked-drain",
            name="Blocked Drain",
            aliases=[
                "clogged drain",
                "drain blocked"
            ]
        ),

        IssueType(
            id="open-manhole",
            name="Open Manhole",
            aliases=[
                "open sewer",
                "manhole uncovered"
            ]
        ),

        IssueType(
            id="broken-manhole-cover",
            name="Broken Manhole Cover",
            aliases=[
                "damaged manhole cover"
            ]
        ),

        IssueType(
            id="water-leakage",
            name="Water Leakage",
            aliases=[
                "pipe leakage",
                "water leak"
            ]
        ),

        IssueType(
            id="burst-pipeline",
            name="Burst Pipeline",
            aliases=[
                "pipeline burst",
                "pipe burst"
            ]
        ),

        IssueType(
            id="sewer-overflow",
            name="Sewer Overflow",
            aliases=[
                "overflowing sewer",
                "sewage overflow"
            ]
        ),

        IssueType(
            id="construction-debris",
            name="Construction Debris",
            aliases=[
                "construction waste",
                "debris on road"
            ]
        ),

        IssueType(
            id="bridge-damage",
            name="Bridge Damage",
            aliases=[
                "damaged bridge",
                "bridge crack"
            ]
        ),

        IssueType(
            id="collapsed-culvert",
            name="Collapsed Culvert",
            aliases=[
                "culvert collapse"
            ]
        ),

        IssueType(
            id="retaining-wall-damage",
            name="Retaining Wall Damage",
            aliases=[
                "broken wall"
            ]
        ),

        IssueType(
            id="government-building-damage",
            name="Government Building Damage",
            aliases=[
                "building crack",
                "building collapse risk"
            ]
        )
    ]
)
# ============================================================================
# MUNICIPAL CORPORATION
# ============================================================================

MUNICIPAL_CORPORATION = Department(
    id="municipal-corporation",
    name="Municipal Corporation",

    responsibilities=[
        Responsibility("solid-waste-management", "Solid Waste Management"),
        Responsibility("sanitation", "Public Sanitation"),
        Responsibility("cleanliness", "City Cleanliness"),
        Responsibility("public-toilets", "Public Toilets"),
        Responsibility("parks-maintenance", "Parks Maintenance"),
        Responsibility("green-belt-maintenance", "Green Belt Maintenance"),
        Responsibility("stray-animal-management", "Stray Animal Management"),
        Responsibility("public-health-hygiene", "Public Health Hygiene"),
        Responsibility("market-cleanliness", "Market Area Maintenance"),
        Responsibility("community-services", "Community Civic Services"),
    ],

    categories=[
        Category(
            id="garbage",
            name="Garbage",
            aliases=["waste", "trash", "rubbish", "kooda"]
        ),
        Category(
            id="sanitation",
            name="Sanitation",
            aliases=["cleanliness", "hygiene"]
        ),
        Category(
            id="parks",
            name="Parks",
            aliases=["garden", "green area"]
        ),
        Category(
            id="public-toilets",
            name="Public Toilets",
            aliases=["toilet", "washroom", "restroom"]
        ),
        Category(
            id="stray-animals",
            name="Stray Animals",
            aliases=["dogs", "cattle", "monkeys"]
        ),
    ],

    assets=[
        Asset(
            id="dustbin",
            name="Dustbin",
            aliases=["garbage bin", "waste bin", "trash bin"]
        ),
        Asset(
            id="garbage-collection-point",
            name="Garbage Collection Point",
            aliases=["dump point", "collection point"]
        ),
        Asset(
            id="public-toilet",
            name="Public Toilet",
            aliases=["washroom", "toilet block"]
        ),
        Asset(
            id="park",
            name="Park",
            aliases=["garden", "green belt"]
        ),
        Asset(
            id="playground",
            name="Playground",
            aliases=["play area"]
        ),
        Asset(
            id="tree",
            name="Tree",
            aliases=["roadside tree"]
        ),
        Asset(
            id="community-bin",
            name="Community Bin",
            aliases=["common dustbin"]
        ),
    ],

    issue_types=[
        IssueType(
            id="garbage-overflow",
            name="Garbage Overflow",
            aliases=["overflowing dustbin", "garbage piled up"]
        ),
        IssueType(
            id="garbage-not-collected",
            name="Garbage Not Collected",
            aliases=["waste not picked", "garbage pending"]
        ),
        IssueType(
            id="illegal-dumping",
            name="Illegal Dumping",
            aliases=["waste dumping", "garbage dumping"]
        ),
        IssueType(
            id="dirty-road",
            name="Dirty Road",
            aliases=["unclean road", "road not cleaned"]
        ),
        IssueType(
            id="unclean-market",
            name="Unclean Market Area",
            aliases=["dirty market"]
        ),
        IssueType(
            id="public-toilet-dirty",
            name="Dirty Public Toilet",
            aliases=["unclean toilet"]
        ),
        IssueType(
            id="public-toilet-damaged",
            name="Damaged Public Toilet",
            aliases=["broken washroom"]
        ),
        IssueType(
            id="park-damage",
            name="Park Damage",
            aliases=["damaged park"]
        ),
        IssueType(
            id="broken-park-equipment",
            name="Broken Park Equipment",
            aliases=["broken swing", "damaged bench"]
        ),
        IssueType(
            id="grass-overgrown",
            name="Overgrown Grass",
            aliases=["tall grass", "grass not cut"]
        ),
        IssueType(
            id="fallen-tree",
            name="Fallen Tree",
            aliases=["tree fallen", "tree blocking road"]
        ),
        IssueType(
            id="tree-needs-pruning",
            name="Tree Needs Pruning",
            aliases=["overgrown branches"]
        ),
        IssueType(
            id="stray-dogs",
            name="Stray Dogs",
            aliases=["street dogs"]
        ),
        IssueType(
            id="stray-cattle",
            name="Stray Cattle",
            aliases=["cows on road", "buffalo on road"]
        ),
        IssueType(
            id="dead-animal",
            name="Dead Animal Removal",
            aliases=["animal carcass"]
        ),
    ]
)

# ============================================================================
# PUBLIC HEALTH DEPARTMENT
# ============================================================================

PUBLIC_HEALTH = Department(
    id="public-health",
    name="Public Health Department",

    responsibilities=[
        Responsibility("drinking-water", "Drinking Water Supply"),
        Responsibility("water-distribution", "Water Distribution"),
        Responsibility("water-quality", "Water Quality Monitoring"),
        Responsibility("sewerage-network", "Sewerage Network"),
        Responsibility("wastewater-management", "Wastewater Management"),
        Responsibility("public-health-engineering", "Public Health Engineering"),
        Responsibility("pipeline-maintenance", "Pipeline Maintenance"),
        Responsibility("water-treatment", "Water Treatment"),
        Responsibility("sewage-disposal", "Sewage Disposal"),
        Responsibility("water-infrastructure", "Water Infrastructure"),
    ],

    categories=[
        Category(
            id="water-supply",
            name="Water Supply",
            aliases=[
                "drinking water",
                "tap water",
                "water connection",
            ],
        ),

        Category(
            id="sewerage",
            name="Sewerage",
            aliases=[
                "sewer",
                "sewage",
                "drainage",
            ],
        ),

        Category(
            id="water-quality",
            name="Water Quality",
            aliases=[
                "dirty water",
                "contaminated water",
            ],
        ),
    ],

    assets=[
        Asset(
            id="water-pipeline",
            name="Water Pipeline",
            aliases=[
                "water line",
                "pipe",
                "pipeline",
            ],
        ),

        Asset(
            id="sewer-pipeline",
            name="Sewer Pipeline",
            aliases=[
                "sewer line",
                "sewage line",
            ],
        ),

        Asset(
            id="water-valve",
            name="Water Valve",
            aliases=[
                "valve",
            ],
        ),

        Asset(
            id="water-tank",
            name="Water Tank",
            aliases=[
                "overhead tank",
                "storage tank",
            ],
        ),

        Asset(
            id="water-treatment-plant",
            name="Water Treatment Plant",
            aliases=[
                "treatment plant",
                "filtration plant",
            ],
        ),

        Asset(
            id="sewage-treatment-plant",
            name="Sewage Treatment Plant",
            aliases=[
                "stp",
            ],
        ),

        Asset(
            id="hydrant",
            name="Fire Hydrant",
            aliases=[
                "hydrant",
                "water hydrant",
            ],
        ),
    ],

    issue_types=[
        IssueType(
            id="water-leakage",
            name="Water Leakage",
            aliases=[
                "water leak",
                "pipe leakage",
            ],
        ),

        IssueType(
            id="burst-pipeline",
            name="Burst Pipeline",
            aliases=[
                "pipe burst",
                "pipeline burst",
            ],
        ),

        IssueType(
            id="low-water-pressure",
            name="Low Water Pressure",
            aliases=[
                "slow water",
                "weak water flow",
            ],
        ),

        IssueType(
            id="no-water-supply",
            name="No Water Supply",
            aliases=[
                "water not coming",
                "no water",
            ],
        ),

        IssueType(
            id="contaminated-water",
            name="Contaminated Water",
            aliases=[
                "dirty water",
                "muddy water",
                "smelly water",
            ],
        ),

        IssueType(
            id="unsafe-drinking-water",
            name="Unsafe Drinking Water",
            aliases=[
                "polluted water",
            ],
        ),

        IssueType(
            id="sewer-overflow",
            name="Sewer Overflow",
            aliases=[
                "overflowing sewer",
                "sewage overflow",
            ],
        ),

        IssueType(
            id="blocked-sewer",
            name="Blocked Sewer",
            aliases=[
                "sewer blockage",
                "choked sewer",
            ],
        ),

        IssueType(
            id="open-sewer",
            name="Open Sewer",
            aliases=[
                "open sewage",
            ],
        ),

        IssueType(
            id="waterlogging",
            name="Waterlogging",
            aliases=[
                "waterlogging",
                "water logging",
                "standing water",
                "water accumulation",
                "flood",
                "flooding",
                "road flooding",
                "rainwater flooding",
            ],
        ),

        IssueType(
            id="damaged-water-valve",
            name="Damaged Water Valve",
            aliases=[
                "broken valve",
            ],
        ),

        IssueType(
            id="damaged-hydrant",
            name="Damaged Fire Hydrant",
            aliases=[
                "broken hydrant",
            ],
        ),

        IssueType(
            id="illegal-water-connection",
            name="Illegal Water Connection",
            aliases=[
                "unauthorized water connection",
            ],
        ),

        IssueType(
            id="water-meter-fault",
            name="Water Meter Fault",
            aliases=[
                "meter not working",
            ],
        ),

        IssueType(
            id="sewage-smell",
            name="Sewage Smell",
            aliases=[
                "bad smell from sewer",
                "foul smell",
            ],
        ),
    ],
)

# ============================================================================
# ELECTRICITY DEPARTMENT
# ============================================================================

ELECTRICITY = Department(
    id="electricity",
    name="Electricity Department",

    responsibilities=[
        Responsibility("power-distribution", "Power Distribution"),
        Responsibility("street-lighting", "Street Lighting"),
        Responsibility("electrical-infrastructure", "Electrical Infrastructure"),
        Responsibility("power-maintenance", "Power Network Maintenance"),
        Responsibility("public-electrical-safety", "Public Electrical Safety"),
        Responsibility("transformer-maintenance", "Transformer Maintenance"),
        Responsibility("feeder-maintenance", "Electrical Feeder Maintenance"),
        Responsibility("distribution-network", "Distribution Network"),
    ],

    categories=[
        Category(
            id="electricity",
            name="Electricity",
            aliases=["power", "electrical"]
        ),
        Category(
            id="street-lighting",
            name="Street Lighting",
            aliases=["street lights", "road lights", "lighting"]
        ),
    ],

    assets=[
        Asset(
            id="street-light",
            name="Street Light",
            aliases=["streetlight", "street lights","street light", "lamp post", "light pole"]
        ),
        Asset(
            id="electric-pole",
            name="Electric Pole",
            aliases=["power pole", "utility pole"]
        ),
        Asset(
            id="transformer",
            name="Transformer",
            aliases=["electric transformer"]
        ),
        Asset(
            id="distribution-box",
            name="Distribution Box",
            aliases=["electrical panel", "distribution panel"]
        ),
        Asset(
            id="power-line",
            name="Power Line",
            aliases=["electric wire", "overhead wire"]
        ),
    ],

    issue_types=[
        IssueType(
            id="street-light-failure",
            name="Street Light Failure",
            aliases=["street light not working", "lamp fused", "light off"]
        ),
        IssueType(
            id="street-light-flickering",
            name="Street Light Flickering",
            aliases=["blinking street light"]
        ),
        IssueType(
            id="broken-electric-pole",
            name="Broken Electric Pole",
            aliases=["damaged pole", "tilted pole"]
        ),
        IssueType(
            id="hanging-wire",
            name="Hanging Electrical Wire",
            aliases=["loose wire", "exposed wire"]
        ),
        IssueType(
            id="transformer-fault",
            name="Transformer Fault",
            aliases=["transformer blast", "transformer failure"]
        ),
        IssueType(
            id="power-outage",
            name="Power Outage",
            aliases=["electricity gone", "no electricity"]
        ),
        IssueType(
            id="short-circuit",
            name="Short Circuit",
            aliases=["electrical short"]
        ),
        IssueType(
            id="sparking-wire",
            name="Sparking Wire",
            aliases=["wire sparking"]
        ),
        IssueType(
            id="distribution-box-damage",
            name="Distribution Box Damage",
            aliases=["panel damage"]
        ),
        IssueType(
            id="electrical-hazard",
            name="Electrical Hazard",
            aliases=["electric shock risk"]
        ),
    ],
)


# ============================================================================
# CHANDIGARH POLICE
# ============================================================================

CHANDIGARH_POLICE = Department(
    id="chandigarh-police",
    name="Chandigarh Police",

    responsibilities=[
        Responsibility("traffic-management", "Traffic Management"),
        Responsibility("law-and-order", "Law and Order"),
        Responsibility("public-safety", "Public Safety"),
        Responsibility("crime-prevention", "Crime Prevention"),
        Responsibility("parking-enforcement", "Parking Enforcement"),
        Responsibility("road-safety", "Road Safety"),
        Responsibility("emergency-response", "Emergency Response"),
        Responsibility("crowd-management", "Crowd Management"),
    ],

    categories=[
        Category(
            id="traffic",
            name="Traffic",
            aliases=["road traffic", "vehicle movement"]
        ),
        Category(
            id="public-safety",
            name="Public Safety",
            aliases=["security", "law and order"]
        ),
    ],

    assets=[
        Asset(
            id="traffic-signal",
            name="Traffic Signal",
            aliases=["traffic light", "signal"]
        ),
        Asset(
            id="traffic-sign",
            name="Traffic Sign",
            aliases=["road sign", "sign board"]
        ),
        Asset(
            id="speed-breaker",
            name="Speed Breaker",
            aliases=["speed hump", "speed bump"]
        ),
        Asset(
            id="zebra-crossing",
            name="Zebra Crossing",
            aliases=["pedestrian crossing"]
        ),
        Asset(
            id="cctv-camera",
            name="CCTV Camera",
            aliases=["surveillance camera"]
        ),
    ],

    issue_types=[
        IssueType(
            id="traffic-signal-failure",
            name="Traffic Signal Failure",
            aliases=["signal not working", "traffic light off"]
        ),
        IssueType(
            id="illegal-parking",
            name="Illegal Parking",
            aliases=["wrong parking", "vehicle blocking road"]
        ),
        IssueType(
            id="traffic-congestion",
            name="Traffic Congestion",
            aliases=["traffic jam"]
        ),
        IssueType(
            id="missing-road-sign",
            name="Missing Road Sign",
            aliases=["missing sign board"]
        ),
        IssueType(
            id="damaged-road-sign",
            name="Damaged Road Sign",
            aliases=["broken sign"]
        ),
        IssueType(
            id="missing-speed-breaker",
            name="Missing Speed Breaker",
            aliases=["need speed breaker"]
        ),
        IssueType(
            id="damaged-speed-breaker",
            name="Damaged Speed Breaker",
            aliases=["broken speed breaker"]
        ),
        IssueType(
            id="unsafe-zebra-crossing",
            name="Unsafe Zebra Crossing",
            aliases=["faded zebra crossing"]
        ),
        IssueType(
            id="cctv-not-working",
            name="CCTV Camera Not Working",
            aliases=["camera not working"]
        ),
        IssueType(
            id="public-nuisance",
            name="Public Nuisance",
            aliases=["disturbance", "public disorder"]
        ),
    ],
)

# ============================================================================
# FIRE & EMERGENCY SERVICES
# ============================================================================

FIRE_EMERGENCY = Department(
    id="fire-emergency",
    name="Fire & Emergency Services",

    responsibilities=[
        Responsibility("fire-response", "Fire Response"),
        Responsibility("fire-prevention", "Fire Prevention"),
        Responsibility("rescue-operations", "Rescue Operations"),
        Responsibility("hazardous-material", "Hazardous Material Response"),
        Responsibility("emergency-response", "Emergency Response"),
        Responsibility("fire-safety-inspection", "Fire Safety Inspection"),
    ],

    categories=[
        Category(
            id="fire-safety",
            name="Fire Safety",
            aliases=["fire", "emergency"]
        ),
    ],

    assets=[
        Asset(
            id="fire-hydrant",
            name="Fire Hydrant",
            aliases=["hydrant"]
        ),
        Asset(
            id="fire-station",
            name="Fire Station",
            aliases=["fire office"]
        ),
        Asset(
            id="fire-extinguisher",
            name="Fire Extinguisher",
            aliases=["extinguisher"]
        ),
        Asset(
            id="emergency-exit",
            name="Emergency Exit",
            aliases=["fire exit"]
        ),
    ],

    issue_types=[
        IssueType(
            id="fire-incident",
            name="Fire Incident",
            aliases=["building fire", "shop fire"]
        ),
        IssueType(
            id="fire-hydrant-damage",
            name="Damaged Fire Hydrant",
            aliases=["broken hydrant"]
        ),
        IssueType(
            id="blocked-fire-access",
            name="Blocked Fire Access",
            aliases=["fire lane blocked"]
        ),
        IssueType(
            id="fire-safety-violation",
            name="Fire Safety Violation",
            aliases=["fire hazard"]
        ),
        IssueType(
            id="gas-leak",
            name="Gas Leak",
            aliases=["gas leakage"]
        ),
        IssueType(
            id="chemical-hazard",
            name="Chemical Hazard",
            aliases=["hazardous chemical"]
        ),
    ],
)


# ============================================================================
# HORTICULTURE DEPARTMENT
# ============================================================================

HORTICULTURE = Department(
    id="horticulture",
    name="Horticulture Department",

    responsibilities=[
        Responsibility("park-maintenance", "Park Maintenance"),
        Responsibility("tree-maintenance", "Tree Maintenance"),
        Responsibility("landscaping", "Landscaping"),
        Responsibility("green-belt-maintenance", "Green Belt Maintenance"),
        Responsibility("plantation", "Tree Plantation"),
        Responsibility("urban-greening", "Urban Greening"),
    ],

    categories=[
        Category(
            id="greenery",
            name="Greenery",
            aliases=["plants", "trees", "parks"]
        ),
    ],

    assets=[
        Asset(
            id="tree",
            name="Tree",
            aliases=["roadside tree"]
        ),
        Asset(
            id="park",
            name="Park",
            aliases=["garden"]
        ),
        Asset(
            id="green-belt",
            name="Green Belt",
            aliases=["green area"]
        ),
        Asset(
            id="hedge",
            name="Hedge",
            aliases=["bush"]
        ),
        Asset(
            id="flower-bed",
            name="Flower Bed",
            aliases=["flowers"]
        ),
    ],

    issue_types=[
        IssueType(
            id="fallen-tree",
            name="Fallen Tree",
            aliases=["tree fallen"]
        ),
        IssueType(
            id="tree-needs-pruning",
            name="Tree Needs Pruning",
            aliases=["overgrown branches"]
        ),
        IssueType(
            id="dead-tree",
            name="Dead Tree",
            aliases=["dry tree"]
        ),
        IssueType(
            id="damaged-park",
            name="Damaged Park",
            aliases=["park damaged"]
        ),
        IssueType(
            id="grass-overgrown",
            name="Overgrown Grass",
            aliases=["grass not cut"]
        ),
        IssueType(
            id="damaged-landscaping",
            name="Damaged Landscaping",
            aliases=["plants damaged"]
        ),
    ],
)


# ============================================================================
# ESTATE OFFICE
# ============================================================================

ESTATE_OFFICE = Department(
    id="estate-office",
    name="Estate Office",

    responsibilities=[
        Responsibility("government-property", "Government Property Management"),
        Responsibility("public-land", "Public Land Management"),
        Responsibility("encroachment-removal", "Encroachment Removal"),
        Responsibility("property-allocation", "Property Allocation"),
        Responsibility("estate-maintenance", "Estate Maintenance"),
    ],

    categories=[
        Category(
            id="government-property",
            name="Government Property",
            aliases=["public property"]
        ),
    ],

    assets=[
        Asset(
            id="government-land",
            name="Government Land",
            aliases=["public land"]
        ),
        Asset(
            id="government-building",
            name="Government Building",
            aliases=["government office"]
        ),
        Asset(
            id="public-space",
            name="Public Space",
            aliases=["public area"]
        ),
    ],

    issue_types=[
        IssueType(
            id="encroachment",
            name="Encroachment",
            aliases=["illegal occupation"]
        ),
        IssueType(
            id="illegal-construction",
            name="Illegal Construction",
            aliases=["unauthorized construction"]
        ),
        IssueType(
            id="government-property-damage",
            name="Government Property Damage",
            aliases=["public property damage"]
        ),
        IssueType(
            id="illegal-land-use",
            name="Illegal Land Use",
            aliases=["land misuse"]
        ),
    ],
)


# ============================================================================
# ENVIRONMENT DEPARTMENT
# ============================================================================

ENVIRONMENT = Department(
    id="environment",
    name="Environment Department",

    responsibilities=[
        Responsibility("air-quality", "Air Quality Management"),
        Responsibility("noise-control", "Noise Pollution Control"),
        Responsibility("environmental-protection", "Environmental Protection"),
        Responsibility("pollution-monitoring", "Pollution Monitoring"),
        Responsibility("waste-regulation", "Environmental Compliance"),
    ],

    categories=[
        Category(
            id="pollution",
            name="Pollution",
            aliases=["environment"]
        ),
    ],

    assets=[
        Asset(
            id="air-quality-monitor",
            name="Air Quality Monitor",
            aliases=["aqi monitor"]
        ),
        Asset(
            id="noise-monitor",
            name="Noise Monitoring Station",
            aliases=["noise sensor"]
        ),
    ],

    issue_types=[
        IssueType(
            id="air-pollution",
            name="Air Pollution",
            aliases=["poor air quality"]
        ),
        IssueType(
            id="noise-pollution",
            name="Noise Pollution",
            aliases=["loud noise"]
        ),
        IssueType(
            id="open-burning",
            name="Open Waste Burning",
            aliases=["garbage burning"]
        ),
        IssueType(
            id="industrial-pollution",
            name="Industrial Pollution",
            aliases=["factory pollution"]
        ),
        IssueType(
            id="water-pollution",
            name="Water Pollution",
            aliases=["polluted water body"]
        ),
    ],
)


# ============================================================================
# CHANDIGARH TRANSPORT UNDERTAKING
# ============================================================================

CTU = Department(
    id="ctu",
    name="Chandigarh Transport Undertaking",

    responsibilities=[
        Responsibility("public-bus-service", "Public Bus Service"),
        Responsibility("bus-stop-maintenance", "Bus Stop Maintenance"),
        Responsibility("passenger-services", "Passenger Services"),
        Responsibility("bus-fleet-management", "Bus Fleet Management"),
        Responsibility("public-transport", "Public Transport"),
    ],

    categories=[
        Category(
            id="public-transport",
            name="Public Transport",
            aliases=["bus service"]
        ),
    ],

    assets=[
        Asset(
            id="bus",
            name="Bus",
            aliases=["public bus"]
        ),
        Asset(
            id="bus-stop",
            name="Bus Stop",
            aliases=["bus shelter"]
        ),
        Asset(
            id="bus-terminal",
            name="Bus Terminal",
            aliases=["bus stand"]
        ),
    ],

    issue_types=[
        IssueType(
            id="bus-delay",
            name="Bus Delay",
            aliases=["late bus"]
        ),
        IssueType(
            id="bus-breakdown",
            name="Bus Breakdown",
            aliases=["bus not working"]
        ),
        IssueType(
            id="damaged-bus-stop",
            name="Damaged Bus Stop",
            aliases=["broken bus shelter"]
        ),
        IssueType(
            id="unclean-bus",
            name="Unclean Bus",
            aliases=["dirty bus"]
        ),
        IssueType(
            id="route-service-issue",
            name="Route Service Issue",
            aliases=["bus route problem"]
        ),
    ],
)

# ============================================================================
# HEALTH DEPARTMENT
# ============================================================================

HEALTH = Department(
    id="health",
    name="Health Department",

    responsibilities=[
        Responsibility("government-hospitals", "Government Hospitals"),
        Responsibility("primary-healthcare", "Primary Healthcare"),
        Responsibility("public-health-services", "Public Health Services"),
        Responsibility("disease-control", "Disease Control"),
        Responsibility("medical-facilities", "Medical Facilities"),
    ],

    categories=[
        Category(
            id="healthcare",
            name="Healthcare",
            aliases=["hospital", "medical"]
        ),
    ],

    assets=[
        Asset(
            id="hospital",
            name="Government Hospital",
            aliases=["civil hospital"]
        ),
        Asset(
            id="dispensary",
            name="Dispensary",
            aliases=["health centre"]
        ),
        Asset(
            id="ambulance",
            name="Ambulance",
            aliases=["emergency vehicle"]
        ),
    ],

    issue_types=[
        IssueType(
            id="hospital-cleanliness",
            name="Poor Hospital Cleanliness",
            aliases=["dirty hospital"]
        ),
        IssueType(
            id="hospital-infrastructure",
            name="Hospital Infrastructure Damage",
            aliases=["broken hospital"]
        ),
        IssueType(
            id="medicine-shortage",
            name="Medicine Shortage",
            aliases=["medicines unavailable"]
        ),
        IssueType(
            id="ambulance-delay",
            name="Ambulance Delay",
            aliases=["ambulance not arriving"]
        ),
        IssueType(
            id="staff-unavailability",
            name="Medical Staff Unavailability",
            aliases=["doctor unavailable"]
        ),
    ],
)


# ============================================================================
# EDUCATION DEPARTMENT
# ============================================================================

EDUCATION = Department(
    id="education",
    name="Education Department",

    responsibilities=[
        Responsibility("government-schools", "Government Schools"),
        Responsibility("school-infrastructure", "School Infrastructure"),
        Responsibility("school-maintenance", "School Maintenance"),
        Responsibility("student-facilities", "Student Facilities"),
    ],

    categories=[
        Category(
            id="education",
            name="Education",
            aliases=["school"]
        ),
    ],

    assets=[
        Asset(
            id="school",
            name="Government School",
            aliases=["school building"]
        ),
        Asset(
            id="classroom",
            name="Classroom",
            aliases=["class"]
        ),
        Asset(
            id="school-playground",
            name="School Playground",
            aliases=["playground"]
        ),
    ],

    issue_types=[
        IssueType(
            id="school-building-damage",
            name="School Building Damage",
            aliases=["damaged school"]
        ),
        IssueType(
            id="unsafe-classroom",
            name="Unsafe Classroom",
            aliases=["broken classroom"]
        ),
        IssueType(
            id="school-cleanliness",
            name="Poor School Cleanliness",
            aliases=["dirty school"]
        ),
        IssueType(
            id="school-water-issue",
            name="School Water Supply Issue",
            aliases=["no water in school"]
        ),
    ],
)


# ============================================================================
# FOREST & WILDLIFE
# ============================================================================

FOREST_WILDLIFE = Department(
    id="forest-wildlife",
    name="Forest & Wildlife Department",

    responsibilities=[
        Responsibility("forest-conservation", "Forest Conservation"),
        Responsibility("wildlife-protection", "Wildlife Protection"),
        Responsibility("tree-preservation", "Tree Preservation"),
        Responsibility("biodiversity", "Urban Biodiversity"),
    ],

    categories=[
        Category(
            id="wildlife",
            name="Wildlife",
            aliases=["animals"]
        ),
    ],

    assets=[
        Asset(
            id="protected-tree",
            name="Protected Tree",
            aliases=["heritage tree"]
        ),
        Asset(
            id="forest-area",
            name="Forest Area",
            aliases=["reserved forest"]
        ),
    ],

    issue_types=[
        IssueType(
            id="illegal-tree-cutting",
            name="Illegal Tree Cutting",
            aliases=["tree cutting"]
        ),
        IssueType(
            id="wild-animal-sighting",
            name="Wild Animal Sighting",
            aliases=["wild animal"]
        ),
        IssueType(
            id="forest-fire",
            name="Forest Fire",
            aliases=["fire in forest"]
        ),
    ],
)


# ============================================================================
# FOOD & SUPPLIES
# ============================================================================

FOOD_SUPPLIES = Department(
    id="food-supplies",
    name="Food & Supplies Department",

    responsibilities=[
        Responsibility("ration-system", "Public Distribution System"),
        Responsibility("ration-shops", "Fair Price Shops"),
        Responsibility("essential-commodities", "Essential Commodities"),
    ],

    categories=[
        Category(
            id="ration",
            name="Ration",
            aliases=["pds", "fair price shop"]
        ),
    ],

    assets=[
        Asset(
            id="ration-shop",
            name="Ration Shop",
            aliases=["fair price shop"]
        ),
    ],

    issue_types=[
        IssueType(
            id="ration-unavailable",
            name="Ration Unavailable",
            aliases=["ration not available"]
        ),
        IssueType(
            id="poor-ration-quality",
            name="Poor Ration Quality",
            aliases=["bad ration"]
        ),
        IssueType(
            id="ration-shop-closed",
            name="Ration Shop Closed",
            aliases=["shop closed"]
        ),
    ],
)


# ============================================================================
# LABOUR DEPARTMENT
# ============================================================================

LABOUR = Department(
    id="labour",
    name="Labour Department",

    responsibilities=[
        Responsibility("labour-welfare", "Labour Welfare"),
        Responsibility("workplace-safety", "Workplace Safety"),
        Responsibility("labour-rights", "Labour Rights"),
    ],

    categories=[
        Category(
            id="labour",
            name="Labour",
            aliases=["worker"]
        ),
    ],

    assets=[
        Asset(
            id="construction-site",
            name="Construction Site",
            aliases=["worksite"]
        ),
    ],

    issue_types=[
        IssueType(
            id="unsafe-worksite",
            name="Unsafe Construction Site",
            aliases=["unsafe workplace"]
        ),
        IssueType(
            id="child-labour",
            name="Child Labour",
            aliases=["minor working"]
        ),
        IssueType(
            id="labour-safety-violation",
            name="Labour Safety Violation",
            aliases=["worker safety"]
        ),
    ],
)


# ============================================================================
# INDUSTRIES DEPARTMENT
# ============================================================================

INDUSTRIES = Department(
    id="industries",
    name="Industries Department",

    responsibilities=[
        Responsibility("industrial-development", "Industrial Development"),
        Responsibility("industrial-estates", "Industrial Estates"),
        Responsibility("industrial-regulation", "Industrial Regulation"),
    ],

    categories=[
        Category(
            id="industry",
            name="Industry",
            aliases=["industrial area", "factory"]
        ),
    ],

    assets=[
        Asset(
            id="factory",
            name="Factory",
            aliases=["industrial unit"]
        ),
        Asset(
            id="industrial-estate",
            name="Industrial Estate",
            aliases=["industrial area"]
        ),
    ],

    issue_types=[
        IssueType(
            id="factory-pollution",
            name="Factory Pollution",
            aliases=["industrial pollution"]
        ),
        IssueType(
            id="unsafe-factory",
            name="Unsafe Factory",
            aliases=["factory safety"]
        ),
        IssueType(
            id="industrial-waste",
            name="Industrial Waste Disposal",
            aliases=["factory waste"]
        ),
    ],
)

# ============================================================================
# TRANSPORT DEPARTMENT
# ============================================================================

TRANSPORT = Department(
    id="transport",
    name="Transport Department",

    responsibilities=[
        Responsibility("vehicle-regulation", "Vehicle Regulation"),
        Responsibility("transport-policy", "Transport Policy"),
        Responsibility("commercial-vehicles", "Commercial Vehicle Regulation"),
        Responsibility("road-transport", "Road Transport Administration"),
    ],

    categories=[
        Category(
            id="transport",
            name="Transport",
            aliases=["vehicles", "commercial transport"]
        ),
    ],

    assets=[
        Asset(
            id="commercial-vehicle",
            name="Commercial Vehicle",
            aliases=["taxi", "auto", "bus", "truck"]
        ),
        Asset(
            id="transport-office",
            name="Transport Office",
            aliases=["RTO"]
        ),
    ],

    issue_types=[
        IssueType(
            id="illegal-commercial-vehicle",
            name="Illegal Commercial Vehicle",
            aliases=["unauthorized taxi", "illegal auto"]
        ),
        IssueType(
            id="vehicle-permit-issue",
            name="Vehicle Permit Issue",
            aliases=["permit problem"]
        ),
        IssueType(
            id="fitness-certificate-issue",
            name="Vehicle Fitness Issue",
            aliases=["fitness expired"]
        ),
    ],
)


# ============================================================================
# TOURISM
# ============================================================================

TOURISM = Department(
    id="tourism",
    name="Tourism Department",

    responsibilities=[
        Responsibility("tourist-sites", "Tourist Site Management"),
        Responsibility("tourism-promotion", "Tourism Promotion"),
        Responsibility("visitor-facilities", "Visitor Facilities"),
        Responsibility("heritage-sites", "Heritage Management"),
    ],

    categories=[
        Category(
            id="tourism",
            name="Tourism",
            aliases=["tourist place", "heritage"]
        ),
    ],

    assets=[
        Asset(
            id="tourist-attraction",
            name="Tourist Attraction",
            aliases=["tourist spot"]
        ),
        Asset(
            id="heritage-site",
            name="Heritage Site",
            aliases=["monument"]
        ),
        Asset(
            id="tourist-information-centre",
            name="Tourist Information Centre",
            aliases=["information centre"]
        ),
    ],

    issue_types=[
        IssueType(
            id="tourist-facility-damage",
            name="Tourist Facility Damage",
            aliases=["damaged tourist site"]
        ),
        IssueType(
            id="poor-tourist-maintenance",
            name="Poor Tourist Site Maintenance",
            aliases=["dirty tourist place"]
        ),
        IssueType(
            id="missing-tourist-signage",
            name="Missing Tourist Signage",
            aliases=["tourist sign missing"]
        ),
    ],
)


# ============================================================================
# EMPLOYMENT
# ============================================================================

EMPLOYMENT = Department(
    id="employment",
    name="Employment Department",

    responsibilities=[
        Responsibility("employment-services", "Employment Services"),
        Responsibility("career-guidance", "Career Guidance"),
        Responsibility("job-registration", "Employment Registration"),
    ],

    categories=[
        Category(
            id="employment",
            name="Employment",
            aliases=["jobs", "career"]
        ),
    ],

    assets=[
        Asset(
            id="employment-office",
            name="Employment Office",
            aliases=["employment exchange"]
        ),
    ],

    issue_types=[
        IssueType(
            id="employment-service-delay",
            name="Employment Service Delay",
            aliases=["job registration delay"]
        ),
        IssueType(
            id="employment-portal-issue",
            name="Employment Portal Issue",
            aliases=["employment website problem"]
        ),
    ],
)


# ============================================================================
# PERSONNEL
# ============================================================================

PERSONNEL = Department(
    id="personnel",
    name="Personnel Department",

    responsibilities=[
        Responsibility("government-hr", "Government Human Resources"),
        Responsibility("employee-services", "Employee Administration"),
        Responsibility("service-records", "Service Records"),
    ],

    categories=[
        Category(
            id="personnel",
            name="Personnel",
            aliases=["hr"]
        ),
    ],

    assets=[
        Asset(
            id="government-office",
            name="Government Office",
            aliases=["office"]
        ),
    ],

    issue_types=[
        IssueType(
            id="employee-service-delay",
            name="Employee Service Delay",
            aliases=["service record issue"]
        ),
        IssueType(
            id="government-employee-grievance",
            name="Government Employee Grievance",
            aliases=["staff grievance"]
        ),
    ],
)

# ============================================================================
# LAW & PROSECUTION
# ============================================================================

LAW_PROSECUTION = Department(
    id="law-prosecution",
    name="Law & Prosecution Department",

    responsibilities=[
        Responsibility("legal-advice", "Legal Advice"),
        Responsibility("government-litigation", "Government Litigation"),
        Responsibility("legal-compliance", "Legal Compliance"),
        Responsibility("prosecution", "Criminal Prosecution"),
    ],

    categories=[
        Category(
            id="legal",
            name="Legal",
            aliases=["law", "legal affairs", "prosecution"]
        ),
    ],

    assets=[
        Asset(
            id="government-court-case",
            name="Government Court Case",
            aliases=["legal case"]
        ),
        Asset(
            id="legal-office",
            name="Legal Office",
            aliases=["law office"]
        ),
    ],

    issue_types=[
        IssueType(
            id="legal-document-delay",
            name="Legal Document Delay",
            aliases=["legal file pending"]
        ),
        IssueType(
            id="government-litigation-issue",
            name="Government Litigation Issue",
            aliases=["court matter"]
        ),
    ],
)


# ============================================================================
# PLANNING
# ============================================================================

PLANNING = Department(
    id="planning",
    name="Planning Department",

    responsibilities=[
        Responsibility("urban-planning", "Urban Planning"),
        Responsibility("master-plan", "Master Plan"),
        Responsibility("land-use-planning", "Land Use Planning"),
        Responsibility("development-planning", "Development Planning"),
    ],

    categories=[
        Category(
            id="urban-planning",
            name="Urban Planning",
            aliases=["city planning", "development"]
        ),
    ],

    assets=[
        Asset(
            id="master-plan",
            name="Master Plan",
            aliases=["city plan"]
        ),
        Asset(
            id="planning-zone",
            name="Planning Zone",
            aliases=["development zone"]
        ),
    ],

    issue_types=[
        IssueType(
            id="land-use-violation",
            name="Land Use Violation",
            aliases=["wrong land use"]
        ),
        IssueType(
            id="unauthorized-development",
            name="Unauthorized Development",
            aliases=["illegal development"]
        ),
        IssueType(
            id="planning-approval-delay",
            name="Planning Approval Delay",
            aliases=["layout approval pending"]
        ),
    ],
)


# ============================================================================
# INFORMATION TECHNOLOGY
# ============================================================================

INFORMATION_TECHNOLOGY = Department(
    id="information-technology",
    name="Information Technology Department",

    responsibilities=[
        Responsibility("government-it", "Government IT Infrastructure"),
        Responsibility("digital-services", "Digital Government Services"),
        Responsibility("network-management", "Government Network Management"),
        Responsibility("cybersecurity", "Government Cybersecurity"),
        Responsibility("e-governance", "E-Governance"),
    ],

    categories=[
        Category(
            id="information-technology",
            name="Information Technology",
            aliases=["it", "technology", "digital services"]
        ),
    ],

    assets=[
        Asset(
            id="government-portal",
            name="Government Portal",
            aliases=["website", "online portal"]
        ),
        Asset(
            id="server",
            name="Server",
            aliases=["application server"]
        ),
        Asset(
            id="government-network",
            name="Government Network",
            aliases=["computer network"]
        ),
    ],

    issue_types=[
        IssueType(
            id="website-down",
            name="Government Website Down",
            aliases=["portal unavailable", "website not working"]
        ),
        IssueType(
            id="login-issue",
            name="Login Issue",
            aliases=["cannot login", "authentication failed"]
        ),
        IssueType(
            id="server-outage",
            name="Server Outage",
            aliases=["server down"]
        ),
        IssueType(
            id="network-failure",
            name="Government Network Failure",
            aliases=["network outage"]
        ),
        IssueType(
            id="portal-performance",
            name="Portal Performance Issue",
            aliases=["website slow", "portal slow"]
        ),
    ],
)

#FINAL ONTOLOGY EXPORT


ONTOLOGY = Ontology(
    departments=[
        ENGINEERING,
        MUNICIPAL_CORPORATION,
        PUBLIC_HEALTH,
        ELECTRICITY,
        CHANDIGARH_POLICE,
        FIRE_EMERGENCY,
        HORTICULTURE,
        ESTATE_OFFICE,
        ENVIRONMENT,
        CTU,
        HEALTH,
        EDUCATION,
        FOREST_WILDLIFE,
        FOOD_SUPPLIES,
        LABOUR,
        INDUSTRIES,
        TRANSPORT,
        TOURISM,
        EMPLOYMENT,
        PERSONNEL,
        LAW_PROSECUTION,
        PLANNING,
        INFORMATION_TECHNOLOGY,
    ]
)