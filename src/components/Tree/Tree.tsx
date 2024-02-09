import { useState, FunctionComponent } from "react";

// Define the type for a single tree node's data
interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

// Define the props for the Tree component
interface TreeProps {
  data: TreeNode[]; // Array of root-level nodes
}

// Recursive TreeItem component
const TreeItem: FunctionComponent<{ node: TreeNode }> = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div onClick={toggleExpand} style={{ cursor: "pointer" }}>
        {node.name}
        {node.children && node.children.length > 0 && (
          <span>{isExpanded ? "▼" : "▶"}</span>
        )}
      </div>
      {isExpanded && node.children && (
        <ul style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Main Tree component
const Tree: FunctionComponent<TreeProps> = ({ data }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {data.map((node) => (
        <TreeItem key={node.id} node={node} />
      ))}
    </ul>
  );
};

export default Tree;
