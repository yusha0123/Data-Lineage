import React, { useState, useEffect } from "react";
import { type Edge, type Node } from "@xyflow/react";
import { FiTrash, FiX } from "react-icons/fi";

interface SidebarProps {
  selectedNode: Node | null;
  onClose: () => void;
  onUpdate: (
    nodeId: string,
    updatedData: Node["data"],
    newEdges: Edge[]
  ) => void;
  allNodes: Node[];
}

type FormData = {
  label: string;
  isFactTable?: boolean | undefined;
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedNode,
  onClose,
  onUpdate,
  allNodes,
}) => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const dimensionNodes = allNodes.filter(
    (n) => n.data && n.data.isFactTable === false
  );
  const dimensionFieldsMap = dimensionNodes.reduce((acc, node) => {
    const data = node.data as unknown as NodeData;
    acc[data.label] = data.fields || [];
    return acc;
  }, {} as Record<string, Field[]>);

  useEffect(() => {
    if (selectedNode?.data) {
      const nodeData = selectedNode.data as unknown as NodeData;

      setFormData({
        label: nodeData.label,
        isFactTable: nodeData.isFactTable || false,
      });

      setFields(Array.isArray(nodeData.fields) ? nodeData.fields : []);
    } else {
      setFormData(null);
      setFields([]);
    }
  }, [selectedNode]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, label: e.target.value });
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "string" }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSave = () => {
    if (!selectedNode) return;

    const updatedData = {
      ...selectedNode.data,
      label: formData?.label,
      fields: fields,
    };

    const newEdges: Edge[] = fields
      .filter((f) => f.isForeignKey && f.references)
      .map((f) => {
        const targetNode = allNodes.find((n) => n.data.label === f.references);
        return {
          id: `${selectedNode.id}-${targetNode?.id || f.references}`,
          source: selectedNode.id,
          target: targetNode?.id || "",
          label: `${formData?.label}.${f.name} → ${f.references}`,
          type: "default",
          animated: true,
          style: { strokeWidth: 2 },
        };
      })
      .filter((e) => e.target !== "");

    onUpdate(selectedNode.id, updatedData, newEdges);
  };

  if (!selectedNode || !formData) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-lg overflow-y-auto z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          Edit {formData.isFactTable ? "Fact" : "Dimension"} Table
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition duration-300 cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Table Name
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={handleLabelChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Fields
            </label>
            <button
              onClick={handleAddField}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded-md cursor-pointer transition duration-300 hover:bg-blue-500/90"
            >
              + Add Field
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={index}
              className="mb-3 p-3 border border-gray-200 rounded-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Field {index + 1}</span>
                <button
                  onClick={() => handleRemoveField(index)}
                  className="text-red-500 hover:text-red-700 transition duration-300 cursor-pointer"
                  title="Delete field"
                >
                  <FiTrash size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Name
                  </label>
                  {field.isForeignKey && field.references ? (
                    <select
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(index, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    >
                      <option value="">Select field</option>
                      {(dimensionFieldsMap[field.references] || []).map((f) => (
                        <option key={f.name} value={f.name}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) =>
                        handleFieldChange(index, "name", e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Type
                  </label>
                  <select
                    value={field.type}
                    onChange={(e) =>
                      handleFieldChange(index, "type", e.target.value)
                    }
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="string">string</option>
                    <option value="int">int</option>
                    <option value="float">float</option>
                    <option value="date">date</option>
                    <option value="boolean">boolean</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`pk-${index}`}
                    checked={field.isPrimaryKey || false}
                    onChange={(e) =>
                      handleFieldChange(index, "isPrimaryKey", e.target.checked)
                    }
                    className="mr-1"
                  />
                  <label htmlFor={`pk-${index}`} className="text-xs">
                    Primary Key
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`fk-${index}`}
                    checked={field.isForeignKey || false}
                    onChange={(e) =>
                      handleFieldChange(index, "isForeignKey", e.target.checked)
                    }
                    className="mr-1"
                  />
                  <label htmlFor={`fk-${index}`} className="text-xs">
                    Foreign Key
                  </label>
                </div>
              </div>

              {field.isForeignKey && (
                <div className="mt-2">
                  <label className="block text-xs text-gray-500 mb-1">
                    References Table
                  </label>
                  <select
                    value={field.references || ""}
                    onChange={(e) => {
                      const updatedFields = [...fields];
                      updatedFields[index] = {
                        ...updatedFields[index],
                        references: e.target.value,
                        name: "", // reset name when reference changes
                      };
                      setFields(updatedFields);
                    }}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="">Select table</option>
                    {dimensionNodes.map((node) => (
                      <option key={node.id} value={node.data.label as string}>
                        {node.data.label as string}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 text-sm border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md cursor-pointer transition duration-300 hover:bg-blue-600/90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
