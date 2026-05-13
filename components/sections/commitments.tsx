"use client"

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

// Healthcare provider testimonials
const commitmentTestimonials = [
  {
    author: {
      name: "Dr. Sarah Chen",
      handle: "CMO, Rural Health Network",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Momentia IO reduced our claim denials by 38% in the first quarter. Their AI-assisted denial prediction has changed how our revenue cycle team operates.",
    href: "#"
  },
  {
    author: {
      name: "Marcus Rodriguez",
      handle: "CFO, Specialty Physician Group",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Reimbursements went up, AR days went down. The team brought a depth of healthcare operational experience that we hadn't seen from prior consultants.",
    href: "#"
  },
  {
    author: {
      name: "Elena Vasquez",
      handle: "Revenue Cycle Director, FQHC",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their coding audit and documentation improvement work translated directly into cleaner claims and a measurable lift in net collections.",
    href: "#"
  },
  {
    author: {
      name: "David Park",
      handle: "COO, Multi-Specialty Practice",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their data strategy work gave us KPI dashboards and operational reporting we never had visibility into. Decisions now feel data-informed instead of reactive.",
    href: "#"
  },
  {
    author: {
      name: "Jessica Lee",
      handle: "CEO, Ambulatory Surgery Center",
      avatar: "https://images.unsplash.com/photo-1487412992267-228dcd4e2e0d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Practical AI — not hype. Momentia IO automated workflows that used to consume hours every day across our front and back office.",
    href: "#"
  },
  {
    author: {
      name: "Michael Thompson",
      handle: "Compliance Officer, Behavioral Health",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their HIPAA assessment and vendor risk work was thorough, pragmatic, and clearly tailored to a healthcare environment — not a generic security checklist.",
    href: "#"
  }
]

export function Commitments() {
  return (
    <section id="commitments">
      <TestimonialsSection
        title="Trusted by Healthcare Providers"
        description="See how healthcare organizations are modernizing operations, improving reimbursements, and reducing denials with Momentia IO."
        testimonials={commitmentTestimonials}
        variant="light"
      />
    </section>
  )
}
