# CampusRide — PowerPoint Content (Slide by Slide)

> Format follows the required outline: Background → Problem statement → Objectives → Literature review → Concepts → Methodology → Technologies → Database design → Features → Timeline → Budget → Challenges → Conclusion.
>
> Each section gives you: **on-slide text** (short enough to fit) and **speaker notes** (what to say).

---

## Slide 1 — Outline

**On slide**

- Background
- Problem Statement
- Objectives
- Literature Review
- Concepts
- Concept Framework
- Winning Concept
- Methodology
- Software Development Technologies
- Database Design
- System Features
- Time Scale and Milestones
- Budget and Resources
- Anticipated Challenges
- Conclusion

**Speaker notes**
CampusRide is a web-based campus transport booking system. The presentation covers why it was built, what it does, how it was built, and what it cost.

---

## Slide 2 — Background

**On slide**

- University campuses in Malawi are large and spread out — students move daily between hostels, lecture halls, markets, banks and bus depots.
- Campus transport is dominated by **informal taxi and motorbike operators** (locally known as *kabaza*).
- Students currently find rides by:
  - walking to the roadside and waiting,
  - calling a driver they already know,
  - asking friends or class WhatsApp groups.
- Drivers have no way to advertise that they are free — they cruise for customers and lose income while idle.
- Almost every student owns a smartphone, but there is **no central platform** linking the two sides.

**Speaker notes**
The gap is not the absence of transport — it is the absence of *information*. Nobody knows who is available, where, or for how much. Both sides lose time and money every day.

---

## Slide 3 — Problem Statement

**On slide**

Ride booking on campus is fragmented and informal, which causes:

- **Long, unpredictable waiting times** — no visibility of who is available.
- **Price uncertainty** — fares are negotiated on the spot and can be unfair.
- **No record of bookings** — disputes cannot be resolved and nobody is accountable.
- **Lost income for drivers** — idle time with no way to be discovered.
- **No way to plan ahead** — students cannot schedule a pickup in advance.
- **Weak trust** — no verified driver details, no shared history.

> Without a unified system, students lose time and drivers lose business.

**Speaker notes**
State the core sentence clearly: this is a coordination problem, and it is solved by a shared platform, not by more drivers.

---

## Slide 4 — Objectives

**On slide**

**General Objective**

To design and develop a web-based transport booking system that connects students with campus taxi and motorbike operators in real time.

**Specific Objectives**

1. To implement role-based registration and secure authentication for students and providers.
2. To design a driver discovery module with service-type filters and live availability status.
3. To develop a ride booking module where a student selects a driver, chooses a pickup time and sees the fare before confirming.
4. To build a provider dashboard with a live ride request feed and accept / decline / complete actions.
5. To provide a daily availability scheduler ("My Schedule") with an automatic return time.
6. To track booking status and allow students to cancel pending rides.
7. To protect user data using authentication tokens and database security rules.

**Speaker notes**
Objectives 1–4 are the core MVP; 5–6 were added after the first review because drivers needed to manage their day; 7 is the security requirement running through everything.

---

## Slide 5 — Literature Review

**On slide**

Systems reviewed:

| System | Strength | Limitation for our context |
| --- | --- | --- |
| Global ride-hailing platforms (Uber, Bolt, inDrive) | Real-time matching, GPS, cashless payments | Built for formal urban markets; require licensing, GPS and commissions; not designed for small campus operators |
| University shuttle / campus transport portals | Fixed routes and timetables | Route-based, not on-demand; students cannot book a specific driver |
| WhatsApp groups and phone contacts (current practice) | Free, already in use | No availability, no fare records, no accountability, no history |

**Speaker notes**
Keep this slide short — the point is that *all* existing options fail in one of two ways: either they are too heavy and commercial, or they are informal and unstructured.

---

## Slide 6 — Literature Review (continued)

**On slide**

**Observation**

Productivity and mobility tools exist, but they are **siloed**. Ride-hailing platforms solve matching but assume formal markets, digital payments and GPS. Informal channels are free but offer no structure.

**How CampusRide is better**

- **Zero install** — runs in the browser on any smartphone; no app store, no storage cost.
- **Zero commission** — the driver keeps 100% of the fare.
- **Cash-friendly** — designed around MWK fares, not card payments.
- **Built for the campus** — short trips, student budgets, motorbike and taxi operators.
- **Real-time by design** — bookings appear on the driver's screen instantly.
- **Accountable** — every ride request is recorded with a status history.

Studies of information systems consistently show that **integrated platforms** — where related activities share one interface and one database — outperform scattered tools, because data consistency and adoption both improve.

**Speaker notes**
This is where you justify the design decision: one platform, one login, one data source, instead of three disconnected tools.

---

## Slide 7 — Concepts

**On slide**

Four building blocks:

1. **STUDENT MODULE** — search, compare, book, track, cancel.
2. **CAMPUSRIDE CORE** — one shared authentication and database for both sides.
3. **PROVIDER MODULE** — availability, ride requests, accept/decline, daily schedule.
4. **BOOKING ENGINE** — the shared record that links a student to a driver at a pickup time.

*(Suggested visual: a centre circle labelled CAMPUSRIDE with three boxes around it — Student, Provider, Booking — joined by arrows.)*

**Speaker notes**
Everything revolves around the booking record. Students create it, providers respond to it, and both sides watch the same status field.

---

## Slide 8 — Concept Framework

**On slide**

```
        STUDENT                          PROVIDER
           │                                │
   Discover drivers                 Set availability
   Filter taxi / motorbike          "Back at" timer
           │                                │
   Choose pickup time  ────────►  Live request feed
   Confirm booking                  Accept / Decline
           │                                │
           └──────────► BOOKINGS ◄──────────┘
                  (shared Firestore collection)
                          │
        Live status for both sides (pending → accepted → completed)
```

- One login, one profile, one database for both roles.
- The same `bookings` collection feeds both dashboards in real time.
- A change by one side is visible to the other within seconds — no refresh needed.

**Speaker notes**
Point at the arrows: the student writes, the provider reads and responds, and both watch the same document change. That single shared record is what removes the phone calls.

---

## Slide 9 — Winning Concept (Web-Based System)

**On slide**

**Why a web application, not a mobile app?**

| Web app | Mobile app |
| --- | --- |
| No installation | Must be downloaded |
| Works on any device | Platform-specific |
| Instant updates | Requires store review |
| No storage used | Consumes phone storage |
| One codebase | Separate Android/iOS builds |
| No store fees | Developer account fees |

- Students open a link and are booking within seconds.
- Drivers do not need a high-end phone.
- The same codebase can later be wrapped as a **Progressive Web App** or published to the Play Store.

**Speaker notes**
For a campus audience with mixed devices and limited data, removing the install step is the single biggest adoption advantage.

---

## Slide 10 — Methodology

**On slide**

**Agile — iterative and incremental development with prototyping**

| Phase | Activities | Deliverable |
| --- | --- | --- |
| 1. Requirements | Interviews, observation of campus transport, feature list | Requirement document |
| 2. Design | Architecture, data model, wireframes | System design |
| 3. MVP 1 | Foundation, authentication, roles, profiles | Working login and dashboards |
| 4. MVP 2 | Driver discovery, booking, live request feed | End-to-end booking |
| 5. Enhancement | My Schedule, price control, clash detection, real status | Polished provider experience |
| 6. Testing | Browser testing, multi-role testing, security rules testing | Verified system |
| 7. Documentation | README, deployment notes, presentation | Project report |

- Each cycle: **build → test in the browser → review → improve**.
- Version control on GitHub after every working increment.

**Speaker notes**
Emphasise the loop. Nothing was declared "done" until it had been clicked through in a real browser with two accounts signed in at the same time.

---

## Slide 11 — Software Development Technologies

**On slide**

**Front end / user interface:** HTML5 · CSS3 · Vanilla JavaScript (ES Modules)

**Back end:** Node.js · Express.js

**Database & services:** Firebase Authentication · Cloud Firestore · Firebase Admin SDK

**Tools:** Visual Studio Code · Git & GitHub · npm

**Speaker notes**
Deliberately no front-end framework. The app is small, so plain HTML/CSS/JS keeps it fast, dependency-light and easy to defend in a viva.

---

## Slide 12 — Technologies and Their Purpose

**On slide**

| Technology | Purpose |
| --- | --- |
| **HTML5** | Page structure and semantic markup |
| **CSS3** | Responsive layout, dashboards, cards, modals and status badges |
| **JavaScript (ES Modules)** | Client-side logic, DOM rendering, live state |
| **Node.js** | Server runtime |
| **Express.js** | REST API, routing and static file serving |
| **Firebase Authentication** | Email/password login, role-based access control |
| **Cloud Firestore** | NoSQL database with real-time listeners |
| **Firebase Admin SDK** | Server-side ID token verification |
| **Git & GitHub** | Version control and backup |
| **Firebase Hosting** *(optional)* | Public deployment |

**Speaker notes**
The two technologies worth explaining are Firestore (real-time listeners) and Firebase Authentication (ID tokens verified on the backend).

---

## Slide 13 — Database Design

**On slide**

**Cloud Firestore — three linked collections**

| Collection | Key fields |
| --- | --- |
| **users/{uid}** | `uid`, `name`, `email`, `phone`, `role` (student / provider), `providerType`, `createdAt` |
| **providers/{providerId}** | `providerId`, `userId`, `name`, `providerType`, `phone`, `vehicleName`, `vehicleRegistration`, `price` (MWK), `estimatedWaitTime`, `available`, `availableUntil` |
| **bookings/{bookingId}** | `bookingId`, `studentId`, `providerId`, `studentName`, `studentPhone`, `pickupTime`, `fare`, `status`, `createdAt`, `updatedAt` |

**Relationships**

- `providers.providerId` = `users.uid` → a provider profile belongs to one user.
- `bookings.studentId` → `users.uid` and `bookings.providerId` → `providers.providerId`.
- Because Firestore is document-based, links are by **ID reference**, not SQL foreign keys; **security rules enforce ownership** instead.

**Booking status lifecycle**

```
pending ──► accepted ──► completed
   │            │
   ├──► rejected (provider)
   └──► cancelled (student)
```

**Speaker notes**
If asked "why NoSQL?", answer: the app needs real-time push updates and a flexible schema, and bookings are read by one field at a time — no complex joins are required.

---

## Slide 14 — System Features

**On slide**

1. **Registration & secure login** — one account, two roles.
2. **Student dashboard** — bookings, status and quick actions.
3. **Driver discovery** — filter by taxi or motorbike; live availability badge on every card.
4. **Booking module** — choose pickup time, see the fare, duplicate-booking guard.
5. **My Bookings** — live status tracking and cancellation of pending/accepted rides.
6. **Provider live request feed** — new requests appear instantly via Firestore listener.
7. **Accept / Decline / Mark Completed** — full request lifecycle.
8. **My Schedule** — availability toggle, "Back at" timer with countdown and automatic return.
9. **Next Up card** — the driver's next accepted ride at a glance.
10. **Request filters** — All / Upcoming / Today / Closed.
11. **Inline price control** — adjust the standard fare in 100 MWK steps.
12. **Clash warning** — flags a request within 30 minutes of an accepted ride.
13. **Call button** — one-tap `tel:` link to the other party.

**Speaker notes**
Do not read all thirteen. Demonstrate the top five live: discovery → book → provider accepts → status updates for the student → My Schedule.

---

## Slide 15 — Time Scale and Milestones

**On slide**

| Activity | Duration | Timeline |
| --- | --- | --- |
| Requirement analysis and system design | 6 days | Week 3–4 |
| Database design and authentication module | 5 days | Week 5–6 |
| Provider registration and profile module | 5 days | Week 7 |
| Driver discovery and booking module | 6 days | Week 8–9 |
| Provider dashboard and live request feed | 6 days | Week 10 |
| My Schedule and enhancements | 5 days | Week 11 |
| Testing, debugging and security rules | 4 days | Week 12 |
| Documentation and presentation | 3 days | Week 13 |

**Speaker notes**
If your actual course dates differ, shift the week numbers — the durations are the real content. The two long poles are the booking module and the provider dashboard.

---

## Slide 16 — Budget and Resources

**On slide**

| Item | Category | Description | Expected time | Unit (MK) | Amount (MK) |
| --- | --- | --- | --- | --- | --- |
| Airtime / data | Internet access | Research, development and testing | 10GB per month at K5,000 × 4 months | 5,000 / month | 20,000 |
| Electricity | Power | Running the laptop throughout the project | K2,000 per month × 4 months | 2,000 / month | 8,000 |
| Transport | Field work | Visiting campus operators for requirements and testing | 4 trips × K2,500 | 2,500 / trip | 10,000 |
| Hosting and domain | Deployment | Firebase free tier + free subdomain | Throughout | Free | 0 |
| Development tools | Software | VS Code, Git, Node.js, Firebase | Throughout | Free / open source | 0 |
| Hardware | Equipment | Laptop and smartphone (already owned) | Throughout | — | 0 |
| **Total** | | | | | **38,000** |

**Speaker notes**
The key point is that the software stack cost nothing — every tool is free or open source. The budget is essentially data, electricity and travel.

---

## Slide 17 — Anticipated Challenges

**On slide**

- **Data security and privacy** — student phone numbers and driver details are sensitive.
  *Mitigation:* Firebase Authentication, token verification on the backend, and strict Firestore rules that lock each user to their own documents.
- **Unreliable campus network** — real-time listeners can drop on weak Wi-Fi.
  *Mitigation:* backend REST fallback, refresh controls, and self-healing client logic.
- **Learning curve** — Firebase, Firestore and ES modules within a short semester.
  *Mitigation:* incremental milestones; each feature tested before the next was started.
- **Driver adoption** — informal operators may distrust a digital system.
  *Mitigation:* zero commission, no app install, and a dashboard that saves them time from day one.
- **Trust and verification** — no formal vetting of drivers yet.
  *Mitigation:* planned admin verification module as future work.
- **Scope control** — pressure to add payments, GPS and ratings.
  *Mitigation:* features deliberately deferred to Module 3.
- **Cost at scale** — Firestore reads grow with users.
  *Mitigation:* single-field queries, client-side sorting, and caching of provider lists.

**Speaker notes**
Pick two or three and speak to them properly rather than listing all seven. Security and adoption are the most credible ones.

---

## Slide 18 — Conclusion

**On slide**

- CampusRide replaces fragmented, word-of-mouth ride arrangements with **one real-time web platform**.
- Students get **visibility**: who is available, what the fare is, and where their booking stands.
- Drivers get **control**: a live request feed, an availability schedule, and their own price.
- Built entirely on **open-source and free-tier technologies** — no licence fees, no app store, no commission.
- The system is **install-free, low-cost and scalable** to other campuses.
- **Future work:** driver verification, in-app payments, GPS tracking, ratings, offline/PWA support, and admin analytics.

> The objective — a functional, user-friendly digital assistant for campus transport — has been achieved.

**Speaker notes**
Close on the objective statement. Everything on the slide should already have been demonstrated, so this is a summary, not new information.

---

## Optional Slide 19 — Live Demonstration / Screenshots

Suggested order for a 3-minute demo:

1. Student logs in → **Find Transport** → filter by motorbike.
2. Point out the live availability badge on each driver card.
3. Book a driver → show the pickup time pre-filled and the fare.
4. Switch to the provider account → the request has already appeared.
5. Accept it → switch back to the student → status has changed to **Accepted**.
6. Provider sets **Back at 20:58** → the student list shows the **Back at** badge.
7. Show the **clash warning** on a request near an accepted ride.

**Tip:** use two browser profiles (normal + incognito) so both roles can be signed in at once.

---

## Design Tips for the Deck

- **Font:** one sans-serif (Calibri, Inter or Poppins). Titles 32–36 pt, body 18–22 pt.
- **Colour:** reuse the app's palette — amber `#F59E0B` for accents, slate `#0F172A` for text, `#F8FAFC` backgrounds.
- **One idea per slide.** If a slide has more than 6 bullets, split it.
- **Screenshots beat text** on the Features and Winning Concept slides.
- **Diagrams:** Slides 7 and 8 should be drawn, not bulleted.
- **Consistency:** same footer and slide numbers throughout.
- **Timing:** roughly 45–60 seconds per slide → about 12–15 minutes for 18 slides.
