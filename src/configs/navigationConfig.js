import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin"],
    navLink: "/dashboard",
  },
  {
    id: "profile",
    title: "Profile",
    type: "collapse",
    icon: <Icon.User size={20} />,
    permissions: ["admin"],
    children: [
      {
        id: "updateProfile",
        title: "Update Profile",
        type: "item",
        icon: <Icon.Edit size={20} />,
        navLink: "/profile",
        permissions: ["admin"],
      },
      {
        id: "updatePassword",
        title: "Update Password",
        type: "item",
        icon: <Icon.Lock size={20} />,
        navLink: "/password",
        permissions: ["admin"],
      },
    ],
  },
  {
    id: "skill",
    title: "Skill",
    type: "item",
    icon: <Icon.Target size={20} />,
    permissions: ["admin"],
    navLink: "/skill",
  },
  {
    id: "technology",
    title: "Technology",
    type: "item",
    icon: <Icon.Server size={20} />,
    permissions: ["admin"],
    navLink: "/technology",
  },
  {
    id: "service",
    title: "Service",
    type: "item",
    icon: <Icon.ThumbsUp size={20} />,
    permissions: ["admin"],
    navLink: "/service",
  },
  {
    id: "experience",
    title: "Experience",
    type: "item",
    icon: <Icon.Star size={20} />,
    permissions: ["admin"],
    navLink: "/experience",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    type: "item",
    icon: <Icon.Database size={20} />,
    permissions: ["admin"],
    navLink: "/portfolio",
  },
  {
    id: "education",
    title: "Education",
    type: "item",
    icon: <Icon.BookOpen size={20} />,
    permissions: ["admin"],
    navLink: "/education",
  },
  {
    id: "certification",
    title: "Certification",
    type: "item",
    icon: <Icon.Award size={20} />,
    permissions: ["admin"],
    navLink: "/certification",
  },
  {
    id: "blog",
    title: "Blog",
    type: "item",
    icon: <Icon.Tag size={20} />,
    permissions: ["admin"],
    navLink: "/blog",
  },
  {
    id: "gallery",
    title: "Gallery",
    type: "item",
    icon: <Icon.File size={20} />,
    permissions: ["admin"],
    navLink: "/gallery",
  },
  {
    id: "message",
    title: "Message",
    type: "item",
    icon: <Icon.MessageCircle size={20} />,
    permissions: ["admin"],
    navLink: "/message",
  },
];

export default navigationConfig;
