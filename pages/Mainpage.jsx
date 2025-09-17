import React, { useState, useEffect } from "react";

const classes = [
  {
    id: 6,
    name: "Class 6",
    subjects: [
      { name: "Math", topics: ["Numbers", "Algebra Basics", "Geometry"] },
      { name: "Science", topics: ["Plants", "Animals", "Forces"] },
      { name: "English", topics: ["Grammar", "Reading", "Writing"] },
      { name: "Social Studies", topics: ["History", "Geography", "Civics"] },
    ],
  },
  {
    id: 7,
    name: "Class 7",
    subjects: [
      { name: "Math", topics: ["Integers", "Fractions", "Lines & Angles"] },
      { name: "Science", topics: ["Cells", "Electricity", "Water Cycle"] },
      { name: "English", topics: ["Poetry", "Essay Writing", "Comprehension"] },
      { name: "Social Studies", topics: ["Medieval History", "Resources", "Governance"] },
    ],
  },
  // Add additional classes as needed
];

export default function MainPage() {
  const [expandedClassId, setExpandedClassId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile using window width
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(true);
      else setSidebarOpen(false);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When class is expanded, reset subject selection
  useEffect(() => {
    setSelectedSubject(null);
  }, [expandedClassId]);

  const handleClassClick = (classId) => {
    setExpandedClassId((prev) => (prev === classId ? null : classId));
    if (isMobile) setSidebarOpen(false); // Close sidebar on mobile after expand/collapse
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    if (isMobile) setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const currentClass = classes.find((cls) => cls.id === expandedClassId);

  return (
    <div style={styles.pageWrapper}>
      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          ...(sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed),
          ...(isMobile ? styles.sidebarMobile : {}),
        }}
      >
        <div style={styles.profile}>
          <img
            src="https://via.placeholder.com/70"
            alt="Profile"
            style={styles.profilePic}
          />
          <h3 style={styles.profileName}>Student Name</h3>
          <p style={styles.profileClass}>
            {expandedClassId ? `Class ${expandedClassId}` : "Select a Class"}
          </p>
        </div>

        <nav style={styles.nav}>
          {classes.map((cls) => (
            <div key={cls.id}>
              <button
                style={{
                  ...styles.classBtn,
                  ...(expandedClassId === cls.id ? styles.activeClassBtn : {}),
                }}
                onClick={() => handleClassClick(cls.id)}
              >
                {cls.name}
              </button>
              {/* Show subjects if class expanded */}
              {expandedClassId === cls.id && (
                <div style={styles.subjectList}>
                  {cls.subjects.map((subject) => (
                    <button
                      key={subject.name}
                      style={{
                        ...styles.subjectBtn,
                        ...(selectedSubject?.name === subject.name
                          ? styles.activeSubjectBtn
                          : {}),
                      }}
                      onClick={() => handleSubjectClick(subject)}
                    >
                      {subject.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={styles.mainContent}>
        {/* Toggle button on mobile */}
        {isMobile && (
          <button
            style={styles.toggleButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        )}

        {!selectedSubject && (
          <h2 style={styles.pageTitle}>Select a Subject to View Topics</h2>
        )}

        {selectedSubject && (
          <div>
            <h2 style={styles.pageTitle}>
              Topics in {selectedSubject.name} ({currentClass?.name})
            </h2>
            <ul style={styles.topicList}>
              {selectedSubject.topics.map((topic) => (
                <li key={topic} style={styles.topicItem}>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Overlay on mobile */}
      {isMobile && sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f5f7fa",
    position: "relative",
  },
  sidebar: {
    backgroundColor: "#2f3e46",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: 20,
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
    zIndex: 1000,
    width: 250,
  },
  sidebarOpen: {
    transform: "translateX(0)",
    position: "relative",
  },
  sidebarClosed: {
    transform: "translateX(-100%)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  },
  sidebarMobile: {
    height: "100vh",
  },
  profile: {
    textAlign: "center",
    marginBottom: 40,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    marginBottom: 12,
  },
  profileName: {
    margin: 0,
    fontWeight: "bold",
    fontSize: 18,
  },
  profileClass: {
    marginTop: 4,
    fontSize: 14,
    color: "#a3b1c2",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexGrow: 1,
  },
  classBtn: {
    background: "transparent",
    border: "none",
    color: "#a3b1c2",
    padding: "10px 15px",
    textAlign: "left",
    fontSize: 16,
    cursor: "pointer",
    borderRadius: 6,
    transition: "background-color 0.3s ease",
  },
  activeClassBtn: {
    backgroundColor: "#52796f",
    color: "#fff",
  },
  subjectList: {
    marginLeft: 20,
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  subjectBtn: {
    background: "transparent",
    border: "none",
    color: "#cfd8dc",
    padding: "6px 15px",
    textAlign: "left",
    fontSize: 15,
    cursor: "pointer",
    borderRadius: 6,
    transition: "background-color 0.3s ease",
  },
  activeSubjectBtn: {
    backgroundColor: "#84a98c",
    color: "#fff",
  },
  mainContent: {
    flexGrow: 1,
    padding: 30,
    overflowY: "auto",
    position: "relative",
    zIndex: 1,
    backgroundColor: "#fff",
  },
  pageTitle: {
    marginBottom: 20,
    color: "#222",
  },
  topicList: {
    listStyleType: "disc",
    paddingLeft: 20,
    margin: 0,
    fontSize: 16,
  },
  topicItem: {
    marginBottom: 8,
    color: "#555",
  },
  toggleButton: {
    position: "fixed",
    top: 16,
    left: 16,
    zIndex: 1100,
    backgroundColor: "#52796f",
    color: "#ffffff",
    border: "none",
    borderRadius: 6,
    padding: "10px 16px",
    cursor: "pointer",
    fontSize: 16,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 900,
  },
};
