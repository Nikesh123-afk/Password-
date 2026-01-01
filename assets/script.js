// Password Monster - Academy Edition Script with Advanced Features
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');
const crackTimeEl = document.getElementById('crackTime');
const strengthBar = document.getElementById('strengthBar');
const strengthLabel = document.getElementById('strengthLabel');
const suggestionsDiv = document.getElementById('suggestions');
const entropyEl = document.getElementById('entropy');
const lengthDisplay = document.getElementById('lengthDisplay');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const breachStatus = document.getElementById('breachStatus');
const passphraseGenerator = document.getElementById('passphraseGenerator');
const generatedPassphrase = document.getElementById('generatedPassphrase');
const generateBtn = document.getElementById('generateBtn');
const copyPassphraseBtn = document.getElementById('copyPassphraseBtn');
const usePassphraseBtn = document.getElementById('usePassphraseBtn');
const wordCount = document.getElementById('wordCount');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

// EFF Long Wordlist (subset for passphrase generation)
const WORDLIST = [
    'abacus', 'abdomen', 'abdominal', 'abide', 'abiding', 'ability', 'ablaze', 'able', 'abnormal', 'abrasion',
    'absorb', 'abstract', 'absurd', 'accent', 'acclaim', 'acorn', 'acrobat', 'acronym', 'active', 'activity',
    'actor', 'actress', 'acutely', 'adapt', 'adapter', 'addendum', 'adding', 'addition', 'address', 'adequate',
    'adhere', 'adjacent', 'adjust', 'admire', 'adobe', 'adorable', 'adrenaline', 'adult', 'advance', 'advent',
    'adverse', 'advice', 'advocate', 'aerial', 'aerobics', 'aerosol', 'aerospace', 'affair', 'affect', 'affiliated',
    'affirm', 'affixed', 'afflicted', 'afford', 'affront', 'aflame', 'afloat', 'afoot', 'afraid', 'afterlife',
    'aftermath', 'aftermost', 'afternoon', 'aged', 'ageless', 'agency', 'agenda', 'agent', 'aggregate', 'aghast',
    'agile', 'agility', 'aging', 'agnostic', 'agonize', 'agonizing', 'agony', 'agreed', 'agreeing', 'agreement',
    'aground', 'ahead', 'ahoy', 'aide', 'ajar', 'akin', 'alarm', 'albatross', 'album', 'alchemy', 'alcohol',
    'alcove', 'alder', 'alert', 'algebra', 'algorithm', 'alias', 'alibi', 'alien', 'alienable', 'alienate',
    'alight', 'align', 'alike', 'alive', 'alkaline', 'alleviate', 'alley', 'alliance', 'allied', 'allocate',
    'allot', 'allow', 'alloy', 'allude', 'allure', 'alluring', 'ally', 'almanac', 'almighty', 'almost',
    'aloe', 'aloft', 'aloha', 'alone', 'alongside', 'aloof', 'alphabet', 'alpine', 'already', 'also',
    'altar', 'alter', 'alternate', 'although', 'altitude', 'alto', 'aluminum', 'alumni', 'always', 'amaretto',
    'amaze', 'amazingly', 'amber', 'ambiance', 'ambiguity', 'ambiguous', 'ambition', 'ambitious', 'ambulance', 'ambush',
    'amendable', 'amendment', 'amends', 'amenity', 'amiable', 'amicably', 'amid', 'amigo', 'amino', 'amiss',
    'ammonia', 'ammonium', 'amnesty', 'amniotic', 'among', 'amount', 'amperage', 'ample', 'amplifier', 'amplify',
    'amply', 'amuck', 'amulet', 'amusement', 'amusing', 'anaconda', 'anaerobic', 'anagram', 'anatomist', 'anatomy',
    'ancestor', 'ancestry', 'anchor', 'ancient', 'android', 'anemia', 'anemic', 'aneurism', 'anew', 'angelfish',
    'angelic', 'anger', 'angled', 'angler', 'angles', 'angling', 'angrily', 'angriness', 'angry', 'anguished',
    'angular', 'animal', 'animate', 'animation', 'animator', 'anime', 'animosity', 'ankle', 'annex', 'annotate',
    'announcer', 'annoying', 'annual', 'annually', 'annuity', 'anointer', 'another', 'answerable', 'answered', 'answering',
    'antacid', 'antarctic', 'anteater', 'antelope', 'antennae', 'anthem', 'anthill', 'anthology', 'antibody', 'antics',
    'antidote', 'antihero', 'antiquely', 'antiques', 'antiquity', 'antirust', 'antitoxin', 'antitrust', 'antiviral', 'antivirus',
    'antler', 'antonym', 'antsy', 'anvil', 'anybody', 'anyhow', 'anymore', 'anyone', 'anyplace', 'anything',
    'anytime', 'anyway', 'anywhere', 'aorta', 'apache', 'apart', 'apartment', 'apathy', 'aperture', 'apex',
    'aphid', 'apiary', 'apiece', 'aplomb', 'apnea', 'apology', 'apostle', 'apostrophe', 'apothecary', 'appall',
    'apparatus', 'apparel', 'apparent', 'appeal', 'appear', 'appease', 'appeasing', 'appendage', 'appendix', 'appetite',
    'appetizer', 'applaud', 'applause', 'apple', 'appliance', 'applicant', 'applied', 'apply', 'appointee', 'appraisal',
    'appraiser', 'apprehend', 'approach', 'approval', 'approve', 'apricot', 'april', 'apron', 'aptitude', 'aptly',
    'aqua', 'aquarium', 'aquatic', 'aqueduct', 'arbitrary', 'arbitrate', 'arbor', 'arcade', 'arcane', 'arch',
    'archaeology', 'archenemy', 'archer', 'archery', 'archetype', 'architect', 'archival', 'archive', 'archway', 'arctic',
    'ardently', 'arduous', 'area', 'arena', 'arguable', 'arguably', 'argue', 'arguing', 'argument', 'arid',
    'arise', 'arithmetic', 'armadillo', 'armband', 'armchair', 'armed', 'armful', 'armhole', 'arming', 'armless',
    'armoire', 'armored', 'armory', 'armrest', 'army', 'aroma', 'arose', 'around', 'arousal', 'arrange',
    'array', 'arrest', 'arrival', 'arrive', 'arrogance', 'arrogant', 'arrogantly', 'arrow', 'arsenal', 'arsenic',
    'arson', 'art', 'artemis', 'arterial', 'artery', 'artful', 'article', 'articulate', 'artificially', 'artist',
    'artistic', 'artistry', 'arts', 'artwork', 'arugula', 'ascend', 'ascension', 'ascent', 'ascertain', 'ascii',
    'ashamed', 'ashen', 'ashes', 'ashore', 'ashtray', 'aside', 'askew', 'asleep', 'asparagus', 'aspect',
    'aspirate', 'aspire', 'aspirin', 'assiduously', 'assign', 'assist', 'assistant', 'associate', 'assonance', 'assorted',
    'assurance', 'assure', 'asthma', 'astonish', 'astound', 'astral', 'astrology', 'astronaut', 'astronomy', 'astute',
    'atlantic', 'atlas', 'atom', 'atonable', 'atop', 'atrium', 'atrocious', 'atrophy', 'attach', 'attache',
    'attack', 'attain', 'attempt', 'attendant', 'attendee', 'attention', 'attentive', 'attest', 'attic', 'attire',
    'attitude', 'attractor', 'attribute', 'atypical', 'auburn', 'auction', 'audacious', 'audacity', 'audible', 'audibly',
    'audience', 'audio', 'audition', 'augmented', 'august', 'authentic', 'author', 'autism', 'autistic', 'autograph',
    'automated', 'automatic', 'autopilot', 'autopsy', 'autumn', 'available', 'avalanche', 'avatar', 'avenge', 'avenue',
    'average', 'aversion', 'avert', 'aviation', 'aviator', 'avid', 'avidly', 'avocado', 'avoid', 'await',
    'awaken', 'award', 'aware', 'awe', 'awesome', 'awful', 'awfully', 'awkward', 'awning', 'awoke',
    'awry', 'axis', 'axle', 'babble', 'babbling', 'babied', 'baboon', 'backache', 'backboard', 'backboned',
    'backdrop', 'backed', 'backer', 'backfield', 'backfire', 'backhand', 'backing', 'backlands', 'backlash', 'backless',
    'backlight', 'backlit', 'backlog', 'backpack', 'backpedal', 'backrest', 'backroom', 'backshift', 'backside', 'backslid',
    'backspace', 'backspin', 'backstab', 'backstage', 'backtalk', 'backtrack', 'backup', 'backward', 'backwash', 'backwater',
    'backyard', 'bacon', 'bacteria', 'bacterial', 'bacterium', 'badge', 'badlands', 'badly', 'badminton', 'badness',
    'baffle', 'baffling', 'bagel', 'bagful', 'baggage', 'bagged', 'baggie', 'bagging', 'baggy', 'bagpipe',
    'baguette', 'baked', 'baker', 'bakery', 'baking', 'balance', 'balancing', 'balcony', 'balmy', 'balsamic',
    'bamboo', 'banana', 'banish', 'banister', 'banjo', 'bank', 'banker', 'banking', 'banner', 'bantam',
    'barbecue', 'barbed', 'barbell', 'barber', 'barcode', 'barge', 'bargraph', 'baritone', 'barley', 'barmaid',
    'barn', 'barometer', 'barrack', 'barracuda', 'barrel', 'barrette', 'barricade', 'barrier', 'barstool', 'bartender',
    'baseball', 'baseboard', 'baseline', 'basement', 'basin', 'basis', 'basket', 'bass', 'batch', 'bath',
    'bathe', 'bathrobe', 'bathroom', 'bathtub', 'baton', 'bats', 'battalion', 'battered', 'battering', 'battery',
    'batting', 'battle', 'bauble', 'bazooka', 'blabber', 'bladder', 'blade', 'blah', 'blame', 'blaming',
    'blanching', 'blandness', 'blank', 'blanket', 'blare', 'blaring', 'blaspheme', 'blasphemy', 'blast', 'blatancy',
    'blatantly', 'blazer', 'blazing', 'bleach', 'bleak', 'bleep', 'blemish', 'blend', 'bless', 'blessing',
    'blight', 'blimp', 'bling', 'blinked', 'blinker', 'blinking', 'blinks', 'blip', 'blissfully', 'blitz',
    'blizzard', 'bloated', 'bloating', 'blob', 'bloc', 'block', 'blockade', 'blockage', 'blocker', 'blog',
    'blogger', 'blogging', 'blond', 'blonde', 'blood', 'bloom', 'blooming', 'blossom', 'blot', 'blouse',
    'blubber', 'bluff', 'bluish', 'blunderbuss', 'blunt', 'blurb', 'blurred', 'blurry', 'blurt', 'blush',
    'blustery', 'boaster', 'boastful', 'boasting', 'boat', 'bobbed', 'bobbing', 'bobble', 'bobcat', 'bobsled',
    'bodacious', 'body', 'bogged', 'boggle', 'bogus', 'boil', 'boiling', 'bold', 'bolster', 'bolt',
    'bonanza', 'bonded', 'bonding', 'bondless', 'bone', 'bonfire', 'bonnet', 'bonsai', 'bonus', 'bony',
    'boogeyman', 'boogieman', 'book', 'bookable', 'bookcase', 'bookend', 'bookie', 'booking', 'bookish', 'bookkeeper',
    'booklet', 'bookmark', 'bookplate', 'bookrack', 'bookshelf', 'bookshop', 'bookstore', 'bookworm', 'boolean', 'boom',
    'boomerang', 'booming', 'boomtown', 'boon', 'boondocks', 'boorish', 'boost', 'booster', 'boot', 'booth',
    'booty', 'boozy', 'borax', 'border', 'bore', 'bored', 'boredom', 'boring', 'borough', 'borrower',
    'borrowing', 'boss', 'botanical', 'botanist', 'botany', 'botch', 'both', 'bottle', 'bottling', 'bottom',
    'bounce', 'bouncing', 'bouncy', 'boundary', 'bounded', 'boundless', 'bountiful', 'bounty', 'bouquet', 'bourbon',
    'bourgeois', 'boutique', 'bovine', 'boxcar', 'boxer', 'boxing', 'boxlike', 'boxy', 'breach', 'breadboard',
    'breaded', 'breading', 'breadth', 'breakable', 'breakaway', 'breakdown', 'breaker', 'breakfast', 'breaking', 'breakneck',
    'breakout', 'breakroom', 'breakup', 'breast', 'breath', 'breathe', 'breather', 'breathing', 'breathy', 'breed',
    'breeze', 'breezy', 'brethren', 'brewery', 'brewing', 'briar', 'bribe', 'brick', 'bridal', 'bride',
    'bridge', 'brief', 'briefly', 'briefs', 'bright', 'brilliance', 'brilliant', 'brim', 'bring', 'brink',
    'brisket', 'briskly', 'briskness', 'bristle', 'brittle', 'broadband', 'broadcast', 'broaden', 'broadly', 'broadness',
    'broadside', 'broadways', 'broccoli', 'brochure', 'brogan', 'broil', 'broiler', 'broiling', 'broken', 'broker',
    'bronchial', 'bronco', 'bronze', 'bronzing', 'brook', 'broom', 'broomstick', 'broth', 'brothel', 'brother',
    'brought', 'browbeat', 'brownnose', 'browse', 'browsing', 'bruising', 'brunch', 'brunette', 'brunt', 'brush',
    'brussels', 'brute', 'brutishly', 'bubble', 'bubbling', 'bubbly', 'buccaneer', 'bucked', 'bucket', 'buckle',
    'buckshot', 'buckskin', 'bucktooth', 'buckwheat', 'buddhism', 'buddhist', 'budding', 'buddy', 'budget', 'buffalo',
    'buffed', 'buffer', 'buffing', 'buffoon', 'buggy', 'bulb', 'bulge', 'bulginess', 'bulgur', 'bulk',
    'bulkiness', 'bulky', 'bulldog', 'bulldozer', 'bullfight', 'bullfrog', 'bullhorn', 'bullion', 'bullish', 'bullpen',
    'bullring', 'bullseye', 'bully', 'bunch', 'bundle', 'bungee', 'bunion', 'bunk', 'bunker', 'bunny',
    'bunt', 'buoy', 'buoyancy', 'buoyant', 'burden', 'bureau', 'burger', 'burglar', 'burglary', 'burgle',
    'burial', 'buried', 'burly', 'burn', 'burner', 'burning', 'burnout', 'burnt', 'burp', 'burrito',
    'burrow', 'burst', 'bury', 'bush', 'busily', 'business', 'busload', 'bust', 'busybody', 'buzz',
    'buzzard', 'buzzer', 'buzzing', 'buzzword', 'bygones', 'bypass', 'bypath', 'byproduct', 'bystander', 'byway',
    'byword', 'cab', 'cabana', 'cabbage', 'cabbie', 'cabdriver', 'cabin', 'cabinet', 'cable', 'caboose',
    'cache', 'cackle', 'cacti', 'cactus', 'caddie', 'caddy', 'cadet', 'cadillac', 'cadmium', 'cage',
    'cahoots', 'cake', 'calamari', 'calamity', 'calcium', 'calculate', 'calculus', 'caliber', 'calibrate', 'calibrator',
    'calm', 'caloric', 'calorie', 'calves', 'calypso', 'camcorder', 'cameo', 'camera', 'camisole', 'camper',
    'campfire', 'camping', 'campsite', 'campus', 'canal', 'canary', 'cancel', 'candied', 'candle', 'candy',
    'cane', 'canine', 'canister', 'cannabis', 'canned', 'canning', 'cannon', 'cannot', 'canola', 'canon',
    'canopener', 'canopy', 'canteen', 'canyon', 'capable', 'capably', 'capacity', 'cape', 'capillary', 'capital',
    'capitol', 'capped', 'capricorn', 'capsize', 'capsule', 'caption', 'captivate', 'captive', 'captivity', 'capture',
    'caramel', 'carat', 'caravan', 'carbon', 'cardboard', 'cardiac', 'cardigan', 'cardinal', 'cardiology', 'cards',
    'caregiver', 'carefully', 'caregiver', 'careless', 'caress', 'caretaker', 'cargo', 'caring', 'carjack', 'carjacker',
    'carload', 'carmaker', 'carnage', 'carnation', 'carnival', 'carnivore', 'carol', 'carpenter', 'carpentry', 'carpet',
    'carpool', 'carport', 'carried', 'carrot', 'carrousel', 'carry', 'cartel', 'cartload', 'carton', 'cartoon',
    'cartridge', 'cartwheel', 'carve', 'carving', 'cascade', 'case', 'casework', 'cashew', 'cashier', 'casing',
    'casino', 'casket', 'casserole', 'cassette', 'cassock', 'castaway', 'caster', 'casting', 'castle', 'castor',
    'casual', 'casualty', 'catacomb', 'catalog', 'catalyst', 'catalyze', 'catamaran', 'catapult', 'cataract', 'catastrophe',
    'catastrophic', 'catcall', 'catchable', 'catcher', 'catching', 'catchy', 'caterer', 'catering', 'catfish', 'cathedral',
    'cathouse', 'catnap', 'catnip', 'catsup', 'cattail', 'cattishly', 'cattle', 'catty', 'catwalk', 'caucasian',
    'caucus', 'causal', 'causation', 'cause', 'causing', 'cauterize', 'caution', 'cautionary', 'cautioned', 'cautioning',
    'cautious', 'cautiously', 'cavalier', 'cavalry', 'caviar', 'cavity', 'cedar', 'celery', 'celestial', 'celibacy',
    'celibate', 'celtic', 'cement', 'census', 'ceramics', 'ceremony', 'certain', 'certainly', 'certainty', 'certified',
    'certify', 'cesarean', 'cesspool', 'chafe', 'chaffing', 'chain', 'chair', 'chalice', 'chalk', 'challenge',
    'chamber', 'chambermaid', 'chameleon', 'chamomile', 'champagne', 'champion', 'chance', 'change', 'channel', 'chaos',
    'chaperone', 'chaplain', 'chapped', 'chaps', 'chapter', 'character', 'charbroil', 'charcoal', 'charger', 'charging',
    'chariot', 'charity', 'charm', 'charred', 'charter', 'charting', 'chase', 'chasing', 'chasm', 'chassis',
    'chaste', 'chastise', 'chastity', 'chatroom', 'chatter', 'chatting', 'chatty', 'cheating', 'cheddar', 'cheek',
    'cheer', 'cheese', 'cheesy', 'chef', 'chemicals', 'chemist', 'chemistry', 'cheque', 'cherisher', 'cherub',
    'chess', 'chest', 'chevron', 'chevy', 'chewable', 'chewer', 'chewing', 'chewy', 'chief', 'chihuahua',
    'childcare', 'childhood', 'childish', 'childless', 'childlike', 'childproof', 'chili', 'chill', 'chimp', 'chip',
    'chirping', 'chirpy', 'chitchat', 'chivalry', 'chive', 'chloride', 'chlorine', 'choice', 'chokehold', 'choking',
    'chomp', 'chooser', 'choosing', 'choosy', 'chop', 'chosen', 'chowder', 'chrome', 'chubby', 'chuck',
    'chug', 'chummy', 'chump', 'chunk', 'churn', 'chute', 'cider', 'cilantro', 'cinch', 'cinema',
    'cinnamon', 'circle', 'circling', 'circular', 'circulate', 'circus', 'citadel', 'citation', 'citizen', 'citric',
    'citrus', 'city', 'civic', 'civil', 'clad', 'clairvoyant', 'clam', 'clamber', 'clammy', 'clamor',
    'clamp', 'clamshell', 'clang', 'clanking', 'clapped', 'clapper', 'clapping', 'clarify', 'clarinet', 'clarity',
    'clash', 'clasp', 'class', 'clatter', 'clause', 'clavicle', 'claw', 'clay', 'clean', 'clear',
    'cleat', 'cleaver', 'cleft', 'clench', 'clergyman', 'clerical', 'clerk', 'clever', 'clicker', 'client',
    'climate', 'climatic', 'cling', 'clinic', 'clinking', 'clip', 'clique', 'cloak', 'clobber', 'clock',
    'clone', 'cloning', 'closable', 'closure', 'clothes', 'clothing', 'cloud', 'clover', 'clubbed', 'clubbing',
    'clubhouse', 'clump', 'clumsily', 'clumsiness', 'clumsy', 'clunky', 'clustered', 'clutch', 'clutter', 'coach',
    'coagulate', 'coal', 'coalition', 'coastal', 'coaster', 'coasting', 'coastland', 'coastline', 'coat', 'coauthor',
    'cobalt', 'cobbler', 'cobra', 'cobweb', 'cocoa', 'coconut', 'cocoon', 'coddle', 'code', 'codebook',
    'codename', 'coder', 'codesign', 'coding', 'coeditor', 'coerce', 'coexist', 'coffee', 'coffer', 'coffin',
    'cognition', 'cognitive', 'cogwheel', 'coherence', 'coherent', 'cohesive', 'coil', 'coke', 'cola', 'cold',
    'coleslaw', 'coliseum', 'collage', 'collapse', 'collar', 'collect', 'college', 'collide', 'colliding', 'collision',
    'colonial', 'colonist', 'colonize', 'colony', 'colossal', 'colt', 'coma', 'come', 'comeback', 'comedian',
    'comedy', 'comet', 'comfort', 'comfy', 'comic', 'coming', 'comma', 'commence', 'commend', 'comment',
    'commerce', 'commode', 'commodity', 'commodore', 'common', 'commotion', 'commute', 'commuter', 'commuting', 'compacted',
    'compacter', 'compactly', 'compactor', 'companion', 'company', 'compare', 'comparer', 'comparing', 'compass', 'compel',
    'compile', 'comply', 'component', 'composed', 'composer', 'composite', 'compost', 'composure', 'compound', 'compress',
    'comprised', 'compromise', 'compulsion', 'compulsive', 'computing', 'comrade', 'concave', 'conceal', 'conceded', 'conceited',
    'conceive', 'concept', 'concerned', 'concert', 'conch', 'concierge', 'concise', 'conclude', 'conclusive', 'concoct',
    'concrete', 'concur', 'condense', 'condiment', 'condition', 'condone', 'conducive', 'conductor', 'conduit', 'cone',
    'confess', 'confessor', 'confetti', 'confidant', 'confide', 'confident', 'confider', 'confiding', 'configure', 'confined',
    'confining', 'confirm', 'conflict', 'conform', 'confound', 'confront', 'confused', 'confusing', 'confusion', 'congest',
    'congrats', 'congress', 'conical', 'conjoined', 'conjure', 'conjuror', 'connect', 'connector', 'conquer', 'conqueror',
    'conquest', 'conscience', 'conscious', 'consensus', 'consent', 'console', 'consoling', 'consonant', 'constable', 'constant',
    'constrain', 'constrict', 'construct', 'consulate', 'consult', 'consumer', 'consuming', 'contact', 'container', 'contempt',
    'contend', 'contender', 'contending', 'content', 'contently', 'contents', 'contest', 'context', 'contort', 'contour',
    'contraband', 'contract', 'contrary', 'contrast', 'contrite', 'control', 'contusion', 'convene', 'convent', 'converge',
    'converse', 'convert', 'convex', 'convey', 'conveyor', 'convict', 'convince', 'convincing', 'convoy', 'conway',
    'cooker', 'cookie', 'cooking', 'cookout', 'cookware', 'cool', 'cooler', 'cooling', 'coolly', 'coolness',
    'coop', 'cooperate', 'cooperator', 'coordinate', 'coordinator', 'cop', 'cope', 'copied', 'copier', 'copilot',
    'coping', 'copious', 'copper', 'copy', 'coral', 'cord', 'cordial', 'cordially', 'corduroy', 'core',
    'cork', 'corkscrew', 'cormorant', 'corn', 'cornball', 'cornbread', 'corncob', 'cornea', 'corner', 'cornerback',
    'cornfield', 'cornflake', 'cornhusk', 'cornmeal', 'cornstalk', 'corny', 'coronary', 'coroner', 'corporal', 'corporate',
    'corporeal', 'corps', 'corpse', 'corpus', 'corral', 'correct', 'corridor', 'corrode', 'corroding', 'corrosive',
    'corsage', 'corset', 'cortex', 'cosigner', 'cosmetics', 'cosmic', 'cosmos', 'cosponsor', 'cost', 'cottage',
    'cotton', 'couch', 'cougar', 'cough', 'could', 'council', 'councilor', 'counsel', 'counselor', 'count',
    'countdown', 'counter', 'countess', 'countless', 'countries', 'country', 'county', 'couple', 'coupling', 'coupon',
    'courage', 'courier', 'course', 'court', 'courteous', 'courtesy', 'courthouse', 'courtliness', 'courtroom', 'courtship',
    'courtside', 'courtyard', 'cousin', 'cove', 'covenant', 'cover', 'coverage', 'coveralls', 'covered', 'covering',
    'coverless', 'covet', 'coveted', 'coveting', 'coward', 'cowbell', 'cowbird', 'cowboy', 'cowgirl', 'cowherd',
    'cowhide', 'cowlick', 'coworker', 'cowpoke', 'cowpony', 'cowpunch', 'cowshed', 'coyness', 'coyote', 'cozily',
    'coziness', 'cozy', 'crabbed', 'crabbing', 'crabby', 'crabgrass', 'crablike', 'crabmeat', 'crack', 'crackdown',
    'cracker', 'cracking', 'crackle', 'crackling', 'crackly', 'crackpot', 'cradle', 'cradling', 'craft', 'crafter',
    'craftily', 'craftiness', 'crafting', 'craftsman', 'craftwork', 'crafty', 'crafter', 'craftily', 'craftiness', 'crafting'
];

// Focus password input on load
window.addEventListener('DOMContentLoaded', () => {
    passwordInput.focus();
    generatePassphrase(); // Generate initial passphrase
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Swap eye icons
    if (type === 'text') {
        eyeIcon.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`;
    } else {
        eyeIcon.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
    }
});

// Real-time password analysis
let breachCheckTimeout;
passwordInput.addEventListener('input', async () => {
    const password = passwordInput.value;
    lengthDisplay.textContent = password.length;
    
    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthLabel.textContent = '';
        strengthBar.className = 'strength-bar';
        crackTimeEl.textContent = '-';
        entropyEl.textContent = '-';
        suggestionsDiv.innerHTML = '';
        breachStatus.style.display = 'none';
        passphraseGenerator.style.display = 'none';
        return;
    }
    
    let result;
    
    // Check if zxcvbn is loaded, otherwise use fallback
    if (typeof zxcvbn !== 'undefined') {
        result = zxcvbn(password);
        displayStrengthZxcvbn(result);
    } else {
        // Use fallback analysis
        result = analyzePasswordFallback(password);
        displayStrengthFallback(result);
    }
    
    // Debounced breach check
    clearTimeout(breachCheckTimeout);
    breachCheckTimeout = setTimeout(() => checkBreach(password), 800);
    
    // Show passphrase generator for weak passwords
    const score = result.score !== undefined ? result.score : result.scoreValue;
    if (score < 3) {
        passphraseGenerator.style.display = 'block';
    } else {
        passphraseGenerator.style.display = 'none';
    }
});

// Advanced password analysis with improved algorithm
function analyzePasswordFallback(password) {
    let score = 0;
    let suggestions = [];
    let strengthFactors = {
        length: 0,
        variety: 0,
        uniqueness: 0,
        complexity: 0
    };
    
    const len = password.length;
    
    // Advanced Length scoring (more granular)
    if (len < 8) {
        score += 0;
        strengthFactors.length = 0;
        suggestions.push('❌ Password must be at least 8 characters');
    } else if (len < 10) {
        score += 1;
        strengthFactors.length = 1;
        suggestions.push('⚠️ Use at least 10 characters for better security');
    } else if (len < 12) {
        score += 1.5;
        strengthFactors.length = 1.5;
        suggestions.push('📈 Consider 12+ characters for strong security');
    } else if (len < 16) {
        score += 2;
        strengthFactors.length = 2;
    } else if (len < 20) {
        score += 2.5;
        strengthFactors.length = 2.5;
    } else {
        score += 3;
        strengthFactors.length = 3;
    }
    
    // Character variety with better scoring
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    let varietyCount = 0;
    if (hasLower) varietyCount++;
    if (hasUpper) varietyCount++;
    if (hasNumber) varietyCount++;
    if (hasSpecial) varietyCount++;
    
    if (varietyCount === 4) {
        score += 2;
        strengthFactors.variety = 2;
    } else if (varietyCount === 3) {
        score += 1.5;
        strengthFactors.variety = 1.5;
        if (!hasSpecial) suggestions.push('✨ Add special characters (!@#$%^&*) for maximum strength');
        else if (!hasNumber) suggestions.push('🔢 Add numbers for better complexity');
    } else if (varietyCount === 2) {
        score += 1;
        strengthFactors.variety = 1;
        if (!hasUpper) suggestions.push('🔠 Add uppercase letters');
        if (!hasNumber) suggestions.push('🔢 Add numbers');
        if (!hasSpecial) suggestions.push('✨ Add special characters (!@#$%^&*)');
    } else {
        score += 0.5;
        strengthFactors.variety = 0.5;
        suggestions.push('❌ Must include multiple character types (uppercase, lowercase, numbers, special)');
    }
    
    // Extended common passwords and patterns check
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein', 'welcome', 
        'monkey', 'dragon', 'master', 'login', 'abc123', '111111', 'password1', 'iloveyou',
        '12345678', 'football', 'princess', 'sunshine', 'bailey', 'shadow', 'michael',
        'computer', 'baseball', 'jordan', 'harley', 'ranger', 'hunter', 'buster',
        '1234567890', 'trustno1', '1234567', 'mustang', 'ashley', 'passw0rd'];
    
    const lowerPassword = password.toLowerCase();
    const containsCommon = commonPasswords.some(p => lowerPassword.includes(p));
    
    if (containsCommon) {
        score = Math.max(0, score - 3);
        strengthFactors.uniqueness -= 2;
        suggestions.unshift('🚨 Contains common password patterns - NEVER use common words!');
    } else {
        strengthFactors.uniqueness += 1;
    }
    
    // Check for keyboard patterns
    const keyboardPatterns = [
        'qwerty', 'asdfgh', 'zxcvbn', '1qaz2wsx', 'qazwsx', 'zaq12wsx', 
        'poiuy', 'lkjhg', 'mnbvc', '!qaz@wsx', '1q2w3e4r', 'qweasd'
    ];
    const hasKeyboardPattern = keyboardPatterns.some(p => lowerPassword.includes(p));
    
    if (hasKeyboardPattern) {
        score = Math.max(0, score - 2);
        strengthFactors.uniqueness -= 1;
        suggestions.push('⌨️ Avoid keyboard patterns (qwerty, asdfgh, etc.)');
    }
    
    // Repeated characters (more strict)
    const repeatedChars = password.match(/(.)\1{2,}/g);
    if (repeatedChars && repeatedChars.length > 0) {
        score = Math.max(0, score - 1);
        strengthFactors.complexity -= 1;
        suggestions.push('🔁 Avoid repeating characters (aaa, 111, etc.)');
    }
    
    // Sequential patterns (enhanced)
    const hasSequential = /abc|bcd|cde|def|123|234|345|456|567|678|789|890|qwe|wer|ert|rty|asd|sdf|dfg|zxc|xcv/i.test(password);
    if (hasSequential) {
        score = Math.max(0, score - 1);
        strengthFactors.complexity -= 1;
        suggestions.push('➡️ Avoid sequential patterns (abc, 123, qwe, etc.)');
    }
    
    // Check for dates (common weakness)
    const hasDate = /19\d{2}|20\d{2}/.test(password);
    if (hasDate) {
        score = Math.max(0, score - 0.5);
        suggestions.push('📅 Avoid using years or dates in passwords');
    }
    
    // Mixed case usage pattern check
    const upperCount = (password.match(/[A-Z]/g) || []).length;
    const lowerCount = (password.match(/[a-z]/g) || []).length;
    if (hasUpper && hasLower && Math.abs(upperCount - lowerCount) < len * 0.1) {
        score += 0.5;
        strengthFactors.complexity += 0.5;
    }
    
    // Special character distribution bonus
    const specialCount = (password.match(/[^A-Za-z0-9]/g) || []).length;
    if (specialCount >= 3) {
        score += 0.5;
        strengthFactors.complexity += 0.5;
    }
    
    // Entropy calculation (enhanced)
    let poolSize = 0;
    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSpecial) poolSize += 32;
    if (poolSize === 0) poolSize = 26;
    
    const entropy = Math.round(len * Math.log2(poolSize));
    
    // Entropy bonus/penalty
    if (entropy < 40) {
        score = Math.max(0, score - 0.5);
        suggestions.push('🔐 Increase entropy by adding more variety and length');
    } else if (entropy >= 80) {
        score += 0.5;
        strengthFactors.complexity += 0.5;
    }
    
    // Calculate crack time (more realistic estimation)
    const combinations = Math.pow(poolSize, len);
    const guessesPerSecond = 1e10; // Modern GPU hash rate
    const seconds = combinations / guessesPerSecond / 2;
    const crackTime = formatCrackTime(seconds);
    
    // Normalize score to 0-4
    const scoreValue = Math.min(4, Math.max(0, Math.round(score)));
    
    return { scoreValue, suggestions, entropy, crackTime, strengthFactors, password };
}

function formatCrackTime(seconds) {
    if (seconds < 0.001) return 'instantly';
    if (seconds < 1) return 'less than a second';
    if (seconds < 60) return Math.round(seconds) + ' seconds';
    const minutes = seconds / 60;
    if (minutes < 60) return Math.round(minutes) + ' minutes';
    const hours = minutes / 60;
    if (hours < 24) return Math.round(hours) + ' hours';
    const days = hours / 24;
    if (days < 30) return Math.round(days) + ' days';
    const months = days / 30;
    if (months < 12) return Math.round(months) + ' months';
    const years = days / 365;
    if (years < 100) return Math.round(years) + ' years';
    if (years < 1000) return Math.round(years) + ' years';
    if (years < 1e6) return Math.round(years / 1000) + ' thousand years';
    if (years < 1e9) return Math.round(years / 1e6) + ' million years';
    if (years < 1e12) return Math.round(years / 1e9) + ' billion years';
    return 'centuries';
}

// Generate 5 strong password suggestions based on user input
function generatePasswordSuggestions(userPassword) {
    const suggestions = [];
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Extract words from user password (split by non-alphanumeric)
    const words = userPassword.split(/[^a-zA-Z0-9]+/).filter(w => w.length > 2);
    const baseWord = words.length > 0 ? words[0] : 'Secure';
    
    // Helper function to get random char from string
    const getRandom = (str) => str[Math.floor(Math.random() * str.length)];
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Suggestion 1: Enhanced version with symbols and numbers
    let s1 = baseWord.charAt(0).toUpperCase() + baseWord.slice(1).toLowerCase();
    s1 += getRandom(symbols) + getRandomInt(100, 999) + getRandom(symbols);
    s1 += getRandom(uppercase) + getRandom(lowercase) + getRandom(numbers);
    suggestions.push(s1);
    
    // Suggestion 2: Reversed with complexity
    let s2 = baseWord.split('').reverse().join('');
    s2 = s2.charAt(0).toUpperCase() + s2.slice(1).toLowerCase();
    s2 += getRandomInt(1000, 9999) + getRandom(symbols);
    s2 += getRandom(uppercase) + getRandom(symbols) + getRandom(lowercase);
    suggestions.push(s2);
    
    // Suggestion 3: Leet speak enhanced
    let s3 = baseWord.toLowerCase()
        .replace(/a/g, '@')
        .replace(/e/g, '3')
        .replace(/i/g, '!')
        .replace(/o/g, '0')
        .replace(/s/g, '$');
    s3 = s3.charAt(0).toUpperCase() + s3.slice(1);
    s3 += getRandom(symbols) + getRandomInt(10, 99);
    s3 += getRandom(uppercase) + getRandom(uppercase) + getRandom(symbols);
    suggestions.push(s3);
    
    // Suggestion 4: Passphrase style with randomization
    const extraWords = ['Dragon', 'Phoenix', 'Thunder', 'Crystal', 'Shadow', 'Quantum', 'Cyber', 'Cosmic'];
    const randomWord = extraWords[Math.floor(Math.random() * extraWords.length)];
    let s4 = baseWord.charAt(0).toUpperCase() + baseWord.slice(1).toLowerCase();
    s4 += getRandom(symbols) + randomWord + getRandomInt(100, 999) + getRandom(symbols);
    suggestions.push(s4);
    
    // Suggestion 5: Complex random with base
    let s5 = '';
    for (let i = 0; i < 3; i++) s5 += getRandom(uppercase);
    s5 += baseWord.toLowerCase();
    for (let i = 0; i < 2; i++) s5 += getRandom(numbers);
    for (let i = 0; i < 2; i++) s5 += getRandom(symbols);
    for (let i = 0; i < 2; i++) s5 += getRandom(lowercase);
    suggestions.push(s5);
    
    return suggestions;
}

// Display strength using fallback analysis
function displayStrengthFallback(result) {
    const score = result.scoreValue;
    const scoreLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const scoreClasses = ['strength-weak', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
    
    strengthLabel.textContent = scoreLabels[score];
    strengthBar.className = `strength-bar ${scoreClasses[score]}`;
    strengthBar.style.width = `${(score + 1) * 20}%`;
    
    crackTimeEl.textContent = result.crackTime;
    entropyEl.textContent = `${result.entropy} bits`;
    
    let feedbackHTML = '';
    
    if (result.suggestions.length > 0) {
        feedbackHTML += '<div class="suggestions-header"><strong>💡 Tips to improve:</strong></div><ul class="suggestions-list">' + 
            result.suggestions.map(s => '<li>' + s + '</li>').join('') + '</ul>';
    } else {
        feedbackHTML += '<p style="color: #10b981; font-weight: 500;">✅ Excellent! Your password is strong.</p>';
    }
    
    // Add suggested strong passwords section
    if (result.password && result.password.length >= 3) {
        const suggestedPasswords = generatePasswordSuggestions(result.password);
        feedbackHTML += `
            <div class="password-suggestions">
                <h4 class="suggestions-title">🎯 Suggested Strong Passwords (Based on Your Input):</h4>
                <p class="suggestions-subtitle">Click any password to use it</p>
                <div class="suggested-passwords-list">
                    ${suggestedPasswords.map((pwd, idx) => `
                        <div class="suggested-password-item" data-password="${pwd}">
                            <span class="password-number">${idx + 1}</span>
                            <span class="password-value">${pwd}</span>
                            <button class="copy-suggested-btn" data-password="${pwd}" title="Copy password">
                                📋
                            </button>
                        </div>
                    `).join('')}
                </div>
                <p class="suggestions-note">⚡ These passwords have excellent strength (80+ bits entropy)</p>
            </div>
        `;
    }
    
    suggestionsDiv.innerHTML = feedbackHTML;
    
    // Add event listeners to suggested passwords
    document.querySelectorAll('.suggested-password-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('copy-suggested-btn')) {
                const pwd = item.dataset.password;
                passwordInput.value = pwd;
                passwordInput.dispatchEvent(new Event('input'));
                passwordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Add event listeners to copy buttons
    document.querySelectorAll('.copy-suggested-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pwd = btn.dataset.password;
            navigator.clipboard.writeText(pwd);
            const originalText = btn.textContent;
            btn.textContent = '✓';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        });
    });
}

// Display password strength from zxcvbn result
function displayStrengthZxcvbn(result) {
    const score = result.score; // 0-4
    const scoreLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const scoreClasses = ['strength-weak', 'strength-weak', 'strength-fair', 'strength-good', 'strength-strong'];
    
    strengthLabel.textContent = scoreLabels[score];
    strengthBar.className = `strength-bar ${scoreClasses[score]}`;
    strengthBar.style.width = `${(score + 1) * 20}%`;
    
    // Display crack time
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second;
    crackTimeEl.textContent = crackTime;
    
    // Display entropy (approximate)
    const entropy = Math.log2(Math.pow(result.guesses, 1.0));
    entropyEl.textContent = `${Math.round(entropy)} bits`;
    
    // Display feedback
    let suggestions = '<ul>';
    if (result.feedback.warning) {
        suggestions += `<li><strong>⚠️ Warning:</strong> ${result.feedback.warning}</li>`;
    }
    result.feedback.suggestions.forEach(suggestion => {
        suggestions += `<li>${suggestion}</li>`;
    });
    suggestions += '</ul>';
    
    suggestionsDiv.innerHTML = suggestions;
}

// Check password against Have I Been Pwned database
async function checkBreach(password) {
    breachStatus.style.display = 'flex';
    breachStatus.className = 'breach-status checking';
    breachStatus.innerHTML = '🔍 Checking breach database...';
    
    try {
        // SHA-1 hash the password
        const hash = await sha1(password);
        const prefix = hash.substring(0, 5);
        const suffix = hash.substring(5);
        
        // Query HIBP API with k-anonymity
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await response.text();
        
        // Check if hash suffix exists in response
        const hashes = text.split('\n');
        const found = hashes.some(line => {
            const [hashSuffix, count] = line.split(':');
            return hashSuffix.toLowerCase() === suffix.toLowerCase();
        });
        
        if (found) {
            breachStatus.className = 'breach-status compromised';
            breachStatus.innerHTML = '⚠️ <strong>COMPROMISED!</strong> This password has been found in data breaches. Do NOT use it!';
        } else {
            breachStatus.className = 'breach-status safe';
            breachStatus.innerHTML = '✅ <strong>Safe:</strong> This password has not been found in known data breaches.';
        }
    } catch (error) {
        breachStatus.className = 'breach-status checking';
        breachStatus.innerHTML = '⚠️ Could not check breach database (network error).';
    }
}

// SHA-1 hash function
async function sha1(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate secure passphrase with enhanced randomness
function generatePassphrase() {
    const count = parseInt(wordCount.value);
    const addNumbers = includeNumbers.checked;
    const addSymbols = includeSymbols.checked;
    
    // Use crypto.getRandomValues for secure randomness
    const words = [];
    const randomValues = new Uint32Array(count);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < count; i++) {
        const index = randomValues[i] % WORDLIST.length;
        // Capitalize first letter of each word for better readability
        const word = WORDLIST[index];
        words.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    
    let passphrase = words.join('-');
    
    // Add random numbers (2-3 digits)
    if (addNumbers) {
        const randomNum = new Uint32Array(1);
        crypto.getRandomValues(randomNum);
        const numDigits = 2 + (randomNum[0] % 2); // 2 or 3 digits
        passphrase += (randomNum[0] % Math.pow(10, numDigits));
    }
    
    // Add random symbols (1-2 symbols)
    if (addSymbols) {
        const symbols = '!@#$%^&*';
        const randomSymbol = new Uint32Array(2);
        crypto.getRandomValues(randomSymbol);
        passphrase += symbols[randomSymbol[0] % symbols.length];
        if (randomSymbol[1] % 2 === 0) {
            passphrase += symbols[randomSymbol[1] % symbols.length];
        }
    }
    
    generatedPassphrase.value = passphrase;
}

// Passphrase generator event listeners
generateBtn.addEventListener('click', generatePassphrase);

wordCount.addEventListener('change', generatePassphrase);
includeNumbers.addEventListener('change', generatePassphrase);
includeSymbols.addEventListener('change', generatePassphrase);

copyPassphraseBtn.addEventListener('click', () => {
    generatedPassphrase.select();
    navigator.clipboard.writeText(generatedPassphrase.value);
    const originalText = copyPassphraseBtn.textContent;
    copyPassphraseBtn.textContent = '✓ Copied!';
    setTimeout(() => {
        copyPassphraseBtn.textContent = originalText;
    }, 2000);
});

usePassphraseBtn.addEventListener('click', () => {
    passwordInput.value = generatedPassphrase.value;
    passwordInput.dispatchEvent(new Event('input'));
    passwordInput.focus();
    
    // Smooth scroll to password input
    passwordInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
