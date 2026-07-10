// Adapted from Control Desk fixture model for the NemezisAI demo.
// Source: HazEOskA/Control-Desk/lib/mock-data.ts
// Demo-only data: no production client records.

export type CandidateStatus = 'new' | 'screening' | 'interview' | 'offer' | 'placed' | 'rejected' | 'on_hold';

export interface Candidate {
  id: string;
  name: string;
  language: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  desiredRole: string;
  availability: string;
  missingDocs: string[];
  recruiter: string;
  lastContact: string;
  notes?: string;
}

export const candidates: Candidate[] = [
  { id: 'c001', name: 'Piotr Kowalski', language: 'Polish', email: 'p.kowalski@mail.com', phone: '+48 601 234 567', status: 'new', desiredRole: 'Warehouse Operator', availability: 'Immediate', missingDocs: ['ID Copy', 'Work Permit'], recruiter: 'Linda van den Berg', lastContact: '2026-06-28' },
  { id: 'c002', name: 'Fatma Yıldız', language: 'Turkish', email: 'f.yildiz@mail.com', phone: '+31 612 345 678', status: 'screening', desiredRole: 'Logistics Driver', availability: '2 weeks', missingDocs: ['Driver License'], recruiter: 'Mark Jansen', lastContact: '2026-06-29' },
  { id: 'c003', name: 'Andrei Popescu', language: 'Romanian', email: 'a.popescu@mail.com', phone: '+40 721 567 890', status: 'interview', desiredRole: 'Forklift Operator', availability: 'Immediate', missingDocs: [], recruiter: 'Linda van den Berg', lastContact: '2026-06-30' },
  { id: 'c004', name: 'Maria Santos', language: 'Portuguese', email: 'm.santos@mail.com', phone: '+31 634 567 890', status: 'offer', desiredRole: 'Production Worker', availability: 'Next week', missingDocs: ['BSN Proof'], recruiter: 'Sophie de Wit', lastContact: '2026-06-29' },
  { id: 'c005', name: 'Tomasz Wróbel', language: 'Polish', email: 't.wrobel@mail.com', phone: '+48 602 345 678', status: 'screening', desiredRole: 'Assembly Line Worker', availability: 'Immediate', missingDocs: ['Work Permit', 'Reference Letter'], recruiter: 'Mark Jansen', lastContact: '2026-06-27' },
  { id: 'c006', name: 'Büşra Çelik', language: 'Turkish', email: 'b.celik@mail.com', phone: '+31 645 678 901', status: 'new', desiredRole: 'Packer', availability: 'Immediate', missingDocs: ['ID Copy'], recruiter: 'Sophie de Wit', lastContact: '2026-06-30' },
  { id: 'c007', name: 'Ivan Petrov', language: 'Russian', email: 'i.petrov@mail.com', phone: '+31 656 789 012', status: 'interview', desiredRole: 'Crane Operator', availability: '1 month', missingDocs: [], recruiter: 'Linda van den Berg', lastContact: '2026-06-28' },
  { id: 'c008', name: 'Agnieszka Nowak', language: 'Polish', email: 'a.nowak@mail.com', phone: '+48 603 456 789', status: 'placed', desiredRole: 'Quality Controller', availability: 'Placed', missingDocs: [], recruiter: 'Mark Jansen', lastContact: '2026-06-25' },
  { id: 'c009', name: 'Mehmet Arslan', language: 'Turkish', email: 'm.arslan@mail.com', phone: '+31 667 890 123', status: 'on_hold', desiredRole: 'Machine Operator', availability: '3 weeks', missingDocs: ['Medical Certificate'], recruiter: 'Sophie de Wit', lastContact: '2026-06-22' },
  { id: 'c010', name: 'Elena Moraru', language: 'Romanian', email: 'e.moraru@mail.com', phone: '+40 742 678 901', status: 'screening', desiredRole: 'Picker/Packer', availability: 'Immediate', missingDocs: ['Work Permit'], recruiter: 'Linda van den Berg', lastContact: '2026-06-30' },
  { id: 'c011', name: 'Krzysztof Zając', language: 'Polish', email: 'k.zajac@mail.com', phone: '+48 604 567 890', status: 'new', desiredRole: 'Truck Driver', availability: 'Next week', missingDocs: ['Driver License', 'ADR Certificate'], recruiter: 'Mark Jansen', lastContact: '2026-06-29' },
  { id: 'c012', name: 'Elif Şahin', language: 'Turkish', email: 'e.sahin@mail.com', phone: '+31 678 901 234', status: 'interview', desiredRole: 'Production Supervisor', availability: '2 weeks', missingDocs: [], recruiter: 'Sophie de Wit', lastContact: '2026-06-28' },
  { id: 'c013', name: 'Viktor Bondarenko', language: 'Ukrainian', email: 'v.bondarenko@mail.com', phone: '+31 689 012 345', status: 'new', desiredRole: 'Welder', availability: 'Immediate', missingDocs: ['Work Permit', 'Welding Certificate'], recruiter: 'Linda van den Berg', lastContact: '2026-06-30' },
  { id: 'c014', name: 'Magdalena Kowalik', language: 'Polish', email: 'm.kowalik@mail.com', phone: '+48 605 678 901', status: 'rejected', desiredRole: 'Office Support', availability: 'N/A', missingDocs: [], recruiter: 'Sophie de Wit', lastContact: '2026-06-20' },
  { id: 'c015', name: 'Yusuf Kaya', language: 'Turkish', email: 'y.kaya@mail.com', phone: '+31 690 123 456', status: 'screening', desiredRole: 'Security Guard', availability: 'Immediate', missingDocs: ['Security License'], recruiter: 'Mark Jansen', lastContact: '2026-06-29' },
  { id: 'c016', name: 'Lucia Ferreira', language: 'Portuguese', email: 'l.ferreira@mail.com', phone: '+31 601 234 567', status: 'offer', desiredRole: 'Cleaner', availability: 'Next week', missingDocs: [], recruiter: 'Linda van den Berg', lastContact: '2026-06-29' },
  { id: 'c017', name: 'Rafał Szczepański', language: 'Polish', email: 'r.szczepanski@mail.com', phone: '+48 606 789 012', status: 'interview', desiredRole: 'IT Support', availability: '1 month', missingDocs: ['Diploma'], recruiter: 'Sophie de Wit', lastContact: '2026-06-27' },
  { id: 'c018', name: 'Hatice Demirci', language: 'Turkish', email: 'h.demirci@mail.com', phone: '+31 612 345 679', status: 'new', desiredRole: 'Food Production Worker', availability: 'Immediate', missingDocs: ['ID Copy', 'Health Certificate'], recruiter: 'Mark Jansen', lastContact: '2026-06-30' },
  { id: 'c019', name: 'Bogdan Ionescu', language: 'Romanian', email: 'b.ionescu@mail.com', phone: '+40 753 789 012', status: 'screening', desiredRole: 'Electrician', availability: '2 weeks', missingDocs: ['Electrical Certificate'], recruiter: 'Linda van den Berg', lastContact: '2026-06-28' },
  { id: 'c020', name: 'Anna Wiśniewska', language: 'Polish', email: 'a.wisniewska@mail.com', phone: '+48 607 890 123', status: 'placed', desiredRole: 'HR Assistant', availability: 'Placed', missingDocs: [], recruiter: 'Sophie de Wit', lastContact: '2026-06-24' },
];

export type WorkerStatus = 'active' | 'on_leave' | 'sick' | 'off_assignment';

export interface Worker {
  id: string;
  name: string;
  language: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  status: WorkerStatus;
  hoursThisWeek: number;
  targetHours: number;
  hourlyRate: number;
  estimatedPay: number;
  leaveBalance: number;
  contractEnd: string;
  alerts: string[];
  weekNumber: number;
}

export const workers: Worker[] = [
  { id: 'w001', name: 'Dariusz Maj', language: 'Polish', email: 'd.maj@worker.com', phone: '+48 501 111 222', company: 'LogiTrans BV', role: 'Warehouse Operator', status: 'active', hoursThisWeek: 38, targetHours: 40, hourlyRate: 12.5, estimatedPay: 475, leaveBalance: 15, contractEnd: '2026-12-31', alerts: [], weekNumber: 27 },
  { id: 'w002', name: 'Selin Koç', language: 'Turkish', email: 's.koc@worker.com', phone: '+31 611 222 333', company: 'FreshPack NL', role: 'Packer', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 11.75, estimatedPay: 470, leaveBalance: 8, contractEnd: '2026-09-30', alerts: ['Contract expires in 92 days'], weekNumber: 27 },
  { id: 'w003', name: 'Vasile Rusu', language: 'Romanian', email: 'v.rusu@worker.com', phone: '+40 701 333 444', company: 'MetalWorks BV', role: 'Machine Operator', status: 'active', hoursThisWeek: 0, targetHours: 40, hourlyRate: 14.0, estimatedPay: 0, leaveBalance: 20, contractEnd: '2027-03-31', alerts: ['Missing hours — no timesheet submitted'], weekNumber: 27 },
  { id: 'w004', name: 'Kamila Bąk', language: 'Polish', email: 'k.bak@worker.com', phone: '+48 502 444 555', company: 'FreshPack NL', role: 'Quality Controller', status: 'on_leave', hoursThisWeek: 0, targetHours: 40, hourlyRate: 13.25, estimatedPay: 0, leaveBalance: 12, contractEnd: '2026-11-30', alerts: ['On approved leave until Jul 7'], weekNumber: 27 },
  { id: 'w005', name: 'Emre Yılmaz', language: 'Turkish', email: 'e.yilmaz@worker.com', phone: '+31 622 333 444', company: 'LogiTrans BV', role: 'Forklift Operator', status: 'active', hoursThisWeek: 45, targetHours: 40, hourlyRate: 13.5, estimatedPay: 607.5, leaveBalance: 5, contractEnd: '2026-08-31', alerts: ['5h overtime this week', 'Contract expires in 62 days'], weekNumber: 27 },
  { id: 'w006', name: 'Monika Lewandowska', language: 'Polish', email: 'm.lewandowska@worker.com', phone: '+48 503 555 666', company: 'CleanCo Services', role: 'Cleaner', status: 'active', hoursThisWeek: 24, targetHours: 32, hourlyRate: 11.0, estimatedPay: 264, leaveBalance: 18, contractEnd: '2027-06-30', alerts: [], weekNumber: 27 },
  { id: 'w007', name: 'Oğuzhan Demir', language: 'Turkish', email: 'o.demir@worker.com', phone: '+31 633 444 555', company: 'MetalWorks BV', role: 'Welder', status: 'sick', hoursThisWeek: 0, targetHours: 40, hourlyRate: 16.0, estimatedPay: 0, leaveBalance: 10, contractEnd: '2026-12-31', alerts: ['Sick leave – day 4', 'Medical certificate required'], weekNumber: 27 },
  { id: 'w008', name: 'Natalia Dąbrowska', language: 'Polish', email: 'n.dabrowska@worker.com', phone: '+48 504 666 777', company: 'AgriGrow BV', role: 'Agricultural Worker', status: 'active', hoursThisWeek: 42, targetHours: 40, hourlyRate: 12.0, estimatedPay: 504, leaveBalance: 22, contractEnd: '2026-10-31', alerts: [], weekNumber: 27 },
  { id: 'w009', name: 'Altan Çetin', language: 'Turkish', email: 'a.cetin@worker.com', phone: '+31 644 555 666', company: 'LogiTrans BV', role: 'Truck Driver', status: 'active', hoursThisWeek: 38, targetHours: 40, hourlyRate: 15.5, estimatedPay: 589, leaveBalance: 7, contractEnd: '2026-07-15', alerts: ['Contract expires in 15 days — URGENT'], weekNumber: 27 },
  { id: 'w010', name: 'Justyna Kaczmarek', language: 'Polish', email: 'j.kaczmarek@worker.com', phone: '+48 505 777 888', company: 'FreshPack NL', role: 'Production Worker', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 12.0, estimatedPay: 480, leaveBalance: 14, contractEnd: '2027-01-31', alerts: [], weekNumber: 27 },
  { id: 'w011', name: 'Sercan Kılıç', language: 'Turkish', email: 's.kilic@worker.com', phone: '+31 655 666 777', company: 'MetalWorks BV', role: 'Crane Operator', status: 'active', hoursThisWeek: 36, targetHours: 40, hourlyRate: 17.0, estimatedPay: 612, leaveBalance: 16, contractEnd: '2027-04-30', alerts: [], weekNumber: 27 },
  { id: 'w012', name: 'Beata Zielińska', language: 'Polish', email: 'b.zielinska@worker.com', phone: '+48 506 888 999', company: 'CleanCo Services', role: 'Cleaning Supervisor', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 13.75, estimatedPay: 550, leaveBalance: 20, contractEnd: '2026-09-30', alerts: ['Contract expires in 92 days'], weekNumber: 27 },
  { id: 'w013', name: 'Murat Aydın', language: 'Turkish', email: 'm.aydin@worker.com', phone: '+31 666 777 888', company: 'AgriGrow BV', role: 'Greenhouse Worker', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 11.5, estimatedPay: 460, leaveBalance: 9, contractEnd: '2026-11-30', alerts: [], weekNumber: 27 },
  { id: 'w014', name: 'Sylwia Pawlak', language: 'Polish', email: 's.pawlak@worker.com', phone: '+48 507 999 000', company: 'LogiTrans BV', role: 'Inventory Specialist', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 13.0, estimatedPay: 520, leaveBalance: 11, contractEnd: '2027-02-28', alerts: [], weekNumber: 27 },
  { id: 'w015', name: 'Kerem Öztürk', language: 'Turkish', email: 'k.ozturk@worker.com', phone: '+31 677 888 999', company: 'FreshPack NL', role: 'Machine Operator', status: 'off_assignment', hoursThisWeek: 0, targetHours: 40, hourlyRate: 13.5, estimatedPay: 0, leaveBalance: 18, contractEnd: '2026-12-31', alerts: ['Off assignment – needs placement'], weekNumber: 27 },
  { id: 'w016', name: 'Łukasz Witek', language: 'Polish', email: 'l.witek@worker.com', phone: '+48 508 000 111', company: 'MetalWorks BV', role: 'Assembly Worker', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 12.75, estimatedPay: 510, leaveBalance: 13, contractEnd: '2026-12-31', alerts: [], weekNumber: 27 },
  { id: 'w017', name: 'Gamze Yıldırım', language: 'Turkish', email: 'g.yildirim@worker.com', phone: '+31 688 999 000', company: 'AgriGrow BV', role: 'Picker', status: 'active', hoursThisWeek: 38, targetHours: 40, hourlyRate: 11.25, estimatedPay: 427.5, leaveBalance: 15, contractEnd: '2026-10-31', alerts: [], weekNumber: 27 },
  { id: 'w018', name: 'Michał Grabowski', language: 'Polish', email: 'm.grabowski@worker.com', phone: '+48 509 111 222', company: 'LogiTrans BV', role: 'Dispatcher', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 14.5, estimatedPay: 580, leaveBalance: 19, contractEnd: '2027-05-31', alerts: [], weekNumber: 27 },
  { id: 'w019', name: 'Zeynep Aslan', language: 'Turkish', email: 'z.aslan@worker.com', phone: '+31 699 000 111', company: 'FreshPack NL', role: 'Line Leader', status: 'active', hoursThisWeek: 40, targetHours: 40, hourlyRate: 15.0, estimatedPay: 600, leaveBalance: 10, contractEnd: '2026-09-30', alerts: ['Contract expires in 92 days'], weekNumber: 27 },
  { id: 'w020', name: 'Renata Mazur', language: 'Polish', email: 'r.mazur@worker.com', phone: '+48 510 222 333', company: 'CleanCo Services', role: 'Cleaner', status: 'active', hoursThisWeek: 32, targetHours: 32, hourlyRate: 11.0, estimatedPay: 352, leaveBalance: 16, contractEnd: '2027-03-31', alerts: [], weekNumber: 27 },
];

export interface InboxMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  category: 'urgent' | 'documents' | 'payroll' | 'leave' | 'client' | 'candidate' | 'archive';
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export const inboxMessages: InboxMessage[] = [
  { id: 'msg001', from: 'LogiTrans BV – Operations', subject: 'URGENT: Driver shortage tomorrow 06:00', preview: 'We need 3 extra drivers for tomorrow morning shift. Can you confirm by 18:00 today?', time: '09:14', category: 'urgent', read: false, priority: 'high' },
  { id: 'msg002', from: 'Emre Yılmaz', subject: 'Overtime approval needed this week', preview: 'I worked 45 hours this week, please confirm overtime rates apply.', time: '08:45', category: 'payroll', read: false, priority: 'high' },
  { id: 'msg003', from: 'Altan Çetin', subject: 'Contract renewal question', preview: 'My contract ends July 15. Will it be renewed? I need to know for my housing application.', time: '08:30', category: 'documents', read: false, priority: 'high' },
  { id: 'msg004', from: 'Kamila Bąk', subject: 'Leave extension request – illness', preview: 'Doctor has extended my sick leave until July 14. Sending certificate shortly.', time: '08:15', category: 'leave', read: false, priority: 'high' },
  { id: 'msg005', from: 'FreshPack NL – HR', subject: 'New placement request – 5 packers', preview: 'We need 5 packers starting Monday. Mixed shift schedule. Please send CVs.', time: '07:55', category: 'client', read: false, priority: 'high' },
  { id: 'msg006', from: 'Piotr Kowalski', subject: 'Documents submission – ID and permit', preview: 'Hi, I have scanned my ID and work permit. When can I start?', time: '07:40', category: 'candidate', read: false, priority: 'medium' },
  { id: 'msg007', from: 'MetalWorks BV – Production', subject: 'Oğuzhan Demir sick for 4th day', preview: 'Just confirming Oğuzhan is still out sick. We need a replacement welder ASAP.', time: '07:20', category: 'urgent', read: false, priority: 'high' },
  { id: 'msg008', from: 'Sophie de Wit', subject: 'Payroll W26 – 2 discrepancies found', preview: 'Week 26 payroll check found issues with Łukasz Witek and Beata Zielińska hours.', time: 'Yesterday', category: 'payroll', read: true, priority: 'high' },
  { id: 'msg009', from: 'Büşra Çelik', subject: 'New candidate – urgent placement needed', preview: 'I am available immediately. My friend referred me. Can we meet this week?', time: 'Yesterday', category: 'candidate', read: false, priority: 'medium' },
  { id: 'msg010', from: 'AgriGrow BV – Manager', subject: 'Payroll approval W26 – pending', preview: 'We still need to approve week 26 payroll. Reminder: deadline is Friday.', time: 'Yesterday', category: 'payroll', read: true, priority: 'medium' },
  { id: 'msg011', from: 'Murat Aydın', subject: 'Annual leave request – Aug 4-15', preview: 'I would like to request 2 weeks annual leave in August. Please confirm.', time: 'Yesterday', category: 'leave', read: false, priority: 'medium' },
  { id: 'msg012', from: 'CleanCo Services', subject: 'Worker performance review needed', preview: 'We need to discuss Monika Lewandowska\'s recent performance. Can we schedule a call?', time: 'Yesterday', category: 'client', read: true, priority: 'medium' },
  { id: 'msg013', from: 'Vasile Rusu', subject: 'Missing timesheet – explanation', preview: 'Sorry for missing timesheet. I had issues with the app. Submitting now.', time: '2 days ago', category: 'payroll', read: false, priority: 'high' },
  { id: 'msg014', from: 'Tomasz Wróbel', subject: 'Documents – work permit renewal', preview: 'My work permit expires next month. What do I need to submit?', time: '2 days ago', category: 'documents', read: true, priority: 'medium' },
  { id: 'msg015', from: 'Linda van den Berg', subject: 'Interview scheduled – Andrei Popescu', preview: 'Confirmed Andrei for Thursday 10:00 at MetalWorks. Please prepare intake form.', time: '2 days ago', category: 'candidate', read: true, priority: 'medium' },
  { id: 'msg016', from: 'Mark Jansen', subject: 'New candidate pool – 6 Polish workers', preview: 'Got 6 referrals from Warsaw contact. Scheduling intakes next week.', time: '2 days ago', category: 'candidate', read: true, priority: 'low' },
  { id: 'msg017', from: 'Sylwia Pawlak', subject: 'Shift change request – next week', preview: 'Can I switch to early morning shift from next week? Personal reasons.', time: '3 days ago', category: 'leave', read: true, priority: 'low' },
  { id: 'msg018', from: 'LogiTrans BV – Finance', subject: 'Invoice #INV-2026-156 – payment confirmation', preview: 'Confirming payment of invoice #INV-2026-156 for May staffing services.', time: '3 days ago', category: 'archive', read: true, priority: 'low' },
  { id: 'msg019', from: 'Kerem Öztürk', subject: 'When will I be reassigned?', preview: 'It\'s been 2 weeks without assignment. Please let me know the situation.', time: '3 days ago', category: 'urgent', read: false, priority: 'high' },
  { id: 'msg020', from: 'AgriGrow BV', subject: 'Seasonal staffing plan – Q3 needed', preview: 'We need 12 pickers from August. Can you send a proposal by end of month?', time: '4 days ago', category: 'client', read: true, priority: 'medium' },
  { id: 'msg021', from: 'Elif Şahin', subject: 'Supervisor role – offer acceptance', preview: 'I am happy to accept the Production Supervisor offer. Can we sign this week?', time: '4 days ago', category: 'documents', read: false, priority: 'medium' },
  { id: 'msg022', from: 'Justyna Kaczmarek', subject: 'Maternity leave starting August', preview: 'I would like to formally notify you of my maternity leave from August 1.', time: '4 days ago', category: 'leave', read: true, priority: 'medium' },
  { id: 'msg023', from: 'MetalWorks BV', subject: 'Safety incident report – W25', preview: 'We need to file a safety incident report for week 25. Sercan Kılıç was involved.', time: '5 days ago', category: 'urgent', read: true, priority: 'high' },
  { id: 'msg024', from: 'Beata Zielińska', subject: 'Pay slip question – June', preview: 'My June pay slip shows different amount than expected. Can you check?', time: '5 days ago', category: 'payroll', read: true, priority: 'medium' },
  { id: 'msg025', from: 'Sophie de Wit', subject: 'Weekly team update', preview: 'All placements for week 27 confirmed. 3 pending contracts need signatures.', time: '5 days ago', category: 'archive', read: true, priority: 'low' },
  { id: 'msg026', from: 'Renata Mazur', subject: 'Address change notification', preview: 'Please update my address in the system. I moved last week.', time: '6 days ago', category: 'archive', read: true, priority: 'low' },
  { id: 'msg027', from: 'FreshPack NL', subject: 'Worker scheduling – holidays period', preview: 'Please confirm availability of all packers during summer holiday period (Jul 25 – Aug 8).', time: '6 days ago', category: 'client', read: true, priority: 'medium' },
  { id: 'msg028', from: 'Dariusz Maj', subject: 'Reference letter request', preview: 'Could you provide a reference letter for my bank mortgage application?', time: '6 days ago', category: 'archive', read: true, priority: 'low' },
  { id: 'msg029', from: 'HR System', subject: 'Automated: 3 contracts expiring within 90 days', preview: 'Automated alert: Selin Koç (Sep 30), Beata Zielińska (Sep 30), Zeynep Aslan (Sep 30).', time: '7 days ago', category: 'documents', read: false, priority: 'high' },
  { id: 'msg030', from: 'CleanCo Services', subject: 'New cleaning contract – 3 sites', preview: 'We\'re expanding to 3 new locations and need cleaning staff from September. Proposal needed.', time: '7 days ago', category: 'client', read: true, priority: 'medium' },
];

export interface Company {
  id: string;
  name: string;
  location: string;
  sector: string;
  activeWorkers: number;
  openRequests: number;
  issues: number;
  payrollStatus: 'approved' | 'pending' | 'overdue';
  contactPerson: string;
  contactEmail: string;
  issueList: string[];
}

export const companies: Company[] = [
  { id: 'co001', name: 'LogiTrans BV', location: 'Rotterdam', sector: 'Logistics', activeWorkers: 6, openRequests: 3, issues: 2, payrollStatus: 'pending', contactPerson: 'Jan Verhoef', contactEmail: 'j.verhoef@logitrans.nl', issueList: ['Driver shortage tomorrow', 'Altan Çetin contract expiring in 15 days'] },
  { id: 'co002', name: 'FreshPack NL', location: 'Westland', sector: 'Food Packaging', activeWorkers: 5, openRequests: 5, issues: 1, payrollStatus: 'pending', contactPerson: 'Inge Bakker', contactEmail: 'i.bakker@freshpack.nl', issueList: ['5 new packers needed urgently', 'Kerem Öztürk off assignment'] },
  { id: 'co003', name: 'MetalWorks BV', location: 'Dordrecht', sector: 'Manufacturing', activeWorkers: 4, openRequests: 1, issues: 3, payrollStatus: 'overdue', contactPerson: 'Pieter de Vries', contactEmail: 'p.devries@metalworks.nl', issueList: ['Oğuzhan Demir sick – replacement needed', 'Safety incident report W25 pending', 'Payroll W26 overdue approval'] },
  { id: 'co004', name: 'AgriGrow BV', location: 'Naaldwijk', sector: 'Agriculture', activeWorkers: 3, openRequests: 12, issues: 0, payrollStatus: 'approved', contactPerson: 'Henk Groen', contactEmail: 'h.groen@agrigrow.nl', issueList: [] },
  { id: 'co005', name: 'CleanCo Services', location: 'The Hague', sector: 'Cleaning', activeWorkers: 3, openRequests: 3, issues: 1, payrollStatus: 'approved', contactPerson: 'Marianne Smit', contactEmail: 'm.smit@cleancoservices.nl', issueList: ['Performance review needed for Monika Lewandowska'] },
];

export interface Document {
  id: string;
  worker: string;
  type: string;
  status: 'valid' | 'expiring' | 'expired' | 'missing' | 'pending';
  expiryDate: string;
  company: string;
  notes?: string;
}

export const documents: Document[] = [
  { id: 'doc001', worker: 'Altan Çetin', type: 'Employment Contract', status: 'expiring', expiryDate: '2026-07-15', company: 'LogiTrans BV', notes: 'Expires in 15 days – renewal needed ASAP' },
  { id: 'doc002', worker: 'Emre Yılmaz', type: 'Employment Contract', status: 'expiring', expiryDate: '2026-08-31', company: 'LogiTrans BV', notes: 'Expires in 62 days' },
  { id: 'doc003', worker: 'Selin Koç', type: 'Employment Contract', status: 'expiring', expiryDate: '2026-09-30', company: 'FreshPack NL' },
  { id: 'doc004', worker: 'Beata Zielińska', type: 'Employment Contract', status: 'expiring', expiryDate: '2026-09-30', company: 'CleanCo Services' },
  { id: 'doc005', worker: 'Zeynep Aslan', type: 'Employment Contract', status: 'expiring', expiryDate: '2026-09-30', company: 'FreshPack NL' },
  { id: 'doc006', worker: 'Oğuzhan Demir', type: 'Medical Certificate', status: 'missing', expiryDate: '—', company: 'MetalWorks BV', notes: 'Required for sick leave day 4+' },
  { id: 'doc007', worker: 'Tomasz Wróbel (candidate)', type: 'Work Permit', status: 'expiring', expiryDate: '2026-07-28', company: '—', notes: 'Renewal process needs to start now' },
  { id: 'doc008', worker: 'Vasile Rusu', type: 'Timesheet W26', status: 'missing', expiryDate: '—', company: 'MetalWorks BV', notes: 'Still not submitted' },
  { id: 'doc009', worker: 'Elif Şahin (candidate)', type: 'Offer Letter', status: 'pending', expiryDate: '2026-07-05', company: 'FreshPack NL', notes: 'Candidate confirmed acceptance – send for signature' },
  { id: 'doc010', worker: 'Piotr Kowalski (candidate)', type: 'Work Permit', status: 'missing', expiryDate: '—', company: '—', notes: 'Promised to submit, waiting' },
];

export interface PayrollRow {
  id: string;
  worker: string;
  company: string;
  weekNumber: number;
  regularHours: number;
  overtimeHours: number;
  hourlyRate: number;
  shiftAllowance: number;
  estimatedGross: number;
  status: 'pending' | 'approved' | 'flagged' | 'processed';
  riskFlag: string | null;
}

export const payrollRows: PayrollRow[] = [
  { id: 'pay001', worker: 'Emre Yılmaz', company: 'LogiTrans BV', weekNumber: 27, regularHours: 40, overtimeHours: 5, hourlyRate: 13.5, shiftAllowance: 25, estimatedGross: 675, status: 'flagged', riskFlag: '5h overtime — needs approval' },
  { id: 'pay002', worker: 'Vasile Rusu', company: 'MetalWorks BV', weekNumber: 26, regularHours: 0, overtimeHours: 0, hourlyRate: 14.0, shiftAllowance: 0, estimatedGross: 0, status: 'flagged', riskFlag: 'No timesheet — cannot process' },
  { id: 'pay003', worker: 'Dariusz Maj', company: 'LogiTrans BV', weekNumber: 27, regularHours: 38, overtimeHours: 0, hourlyRate: 12.5, shiftAllowance: 0, estimatedGross: 475, status: 'pending', riskFlag: null },
  { id: 'pay004', worker: 'Selin Koç', company: 'FreshPack NL', weekNumber: 27, regularHours: 40, overtimeHours: 0, hourlyRate: 11.75, shiftAllowance: 0, estimatedGross: 470, status: 'pending', riskFlag: null },
  { id: 'pay005', worker: 'Monika Lewandowska', company: 'CleanCo Services', weekNumber: 27, regularHours: 24, overtimeHours: 0, hourlyRate: 11.0, shiftAllowance: 0, estimatedGross: 264, status: 'pending', riskFlag: null },
  { id: 'pay006', worker: 'Natalia Dąbrowska', company: 'AgriGrow BV', weekNumber: 27, regularHours: 40, overtimeHours: 2, hourlyRate: 12.0, shiftAllowance: 15, estimatedGross: 519, status: 'pending', riskFlag: null },
  { id: 'pay007', worker: 'Altan Çetin', company: 'LogiTrans BV', weekNumber: 27, regularHours: 38, overtimeHours: 0, hourlyRate: 15.5, shiftAllowance: 30, estimatedGross: 619, status: 'pending', riskFlag: null },
  { id: 'pay008', worker: 'Zeynep Aslan', company: 'FreshPack NL', weekNumber: 27, regularHours: 40, overtimeHours: 0, hourlyRate: 15.0, shiftAllowance: 20, estimatedGross: 620, status: 'approved', riskFlag: null },
  { id: 'pay009', worker: 'Łukasz Witek', company: 'MetalWorks BV', weekNumber: 26, regularHours: 40, overtimeHours: 0, hourlyRate: 12.75, shiftAllowance: 0, estimatedGross: 510, status: 'flagged', riskFlag: 'Hours mismatch vs company report' },
  { id: 'pay010', worker: 'Murat Aydın', company: 'AgriGrow BV', weekNumber: 27, regularHours: 40, overtimeHours: 0, hourlyRate: 11.5, shiftAllowance: 0, estimatedGross: 460, status: 'approved', riskFlag: null },
];

export interface LeaveRequest {
  id: string;
  worker: string;
  company: string;
  type: 'annual' | 'sick' | 'maternity' | 'emergency' | 'unpaid';
  fromDate: string;
  toDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  leaveBalance: number;
  notes?: string;
}

export const leaveRequests: LeaveRequest[] = [
  { id: 'lr001', worker: 'Kamila Bąk', company: 'FreshPack NL', type: 'sick', fromDate: '2026-06-27', toDate: '2026-07-14', days: 14, status: 'active', leaveBalance: 12, notes: 'Extended – medical certificate required by Jul 5' },
  { id: 'lr002', worker: 'Murat Aydın', company: 'AgriGrow BV', type: 'annual', fromDate: '2026-08-04', toDate: '2026-08-15', days: 10, status: 'pending', leaveBalance: 9, notes: 'Requested 2 weeks annual leave' },
  { id: 'lr003', worker: 'Justyna Kaczmarek', company: 'FreshPack NL', type: 'maternity', fromDate: '2026-08-01', toDate: '2027-01-31', days: 130, status: 'pending', leaveBalance: 14, notes: 'Maternity leave – replacement needed from August' },
  { id: 'lr004', worker: 'Sylwia Pawlak', company: 'LogiTrans BV', type: 'annual', fromDate: '2026-07-21', toDate: '2026-07-31', days: 7, status: 'approved', leaveBalance: 11 },
  { id: 'lr005', worker: 'Oğuzhan Demir', company: 'MetalWorks BV', type: 'sick', fromDate: '2026-06-27', toDate: '2026-07-04', days: 4, status: 'active', leaveBalance: 10, notes: 'Sick day 4 – replacement welder needed' },
  { id: 'lr006', worker: 'Michał Grabowski', company: 'LogiTrans BV', type: 'emergency', fromDate: '2026-07-02', toDate: '2026-07-03', days: 2, status: 'pending', leaveBalance: 19, notes: 'Family emergency' },
];

export const alerts = [
  { id: 'a001', type: 'urgent', message: 'LogiTrans needs 3 drivers tomorrow 06:00 — respond by 18:00', action: 'Resolve', link: '/companies' },
  { id: 'a002', type: 'urgent', message: 'Altan Çetin contract expires in 15 days — renewal needed', action: 'Review', link: '/documents' },
  { id: 'a003', type: 'urgent', message: 'MetalWorks needs replacement welder — Oğuzhan Demir on day 4 sick', action: 'Assign', link: '/workers' },
  { id: 'a004', type: 'warning', message: 'Vasile Rusu missing timesheet — W26 payroll cannot process', action: 'Contact', link: '/payroll' },
  { id: 'a005', type: 'warning', message: 'Kerem Öztürk off assignment for 2 weeks — needs placement', action: 'Assign', link: '/workers' },
  { id: 'a006', type: 'warning', message: '3 contracts expiring September 30 — Selin Koç, Beata Zielińska, Zeynep Aslan', action: 'Review', link: '/documents' },
  { id: 'a007', type: 'info', message: 'FreshPack NL requesting 5 packers starting Monday', action: 'Review', link: '/companies' },
  { id: 'a008', type: 'info', message: 'Emre Yılmaz worked 5h overtime — approval needed', action: 'Approve', link: '/payroll' },
  { id: 'a009', type: 'info', message: 'Justyna Kaczmarek maternity leave from August 1 — plan replacement', action: 'Review', link: '/leave' },
  { id: 'a010', type: 'info', message: 'MetalWorks BV payroll W26 overdue — contact finance', action: 'Resolve', link: '/companies' },
];

