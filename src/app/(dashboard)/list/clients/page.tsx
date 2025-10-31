"use client"

import ClientCard from "@/components/ClientCard";
import EmailFormatList from "@/components/EmailFormatList";
import HRCard from "@/components/HRCard";
import { clients, hr, template } from "@/lib/data"
import { Client, ClientWithHRs, EmailTemplate, HR, HRWithClient, HRWithTemplates, TemplateWithHR } from "@/lib/types";
import { useState } from "react"

function getClientsWithHRs(clients: Client[], hrs: HR[]): ClientWithHRs[] {
  return clients.map(client => ({
    ...client,
    hrs: hr.filter(h => h.clientId === client.id)
  }));
};

function getHRsWithClients(hr: HR[], clients: Client[]): HRWithClient[] {
  return hr.map(h => {
    const relatedClient = clients.find(c => c.id === h.clientId);

    // Safety check in case no client is found (optional)
    if (!relatedClient) {
      throw new Error(`Client not found for HR ID: ${h.id}`);
    }

    return {
      ...h,
      client: relatedClient
    };
  });
}

function getTemplateWithHR(hr: HR[], clients: Client[], templates: EmailTemplate[]): HRWithTemplates[] {
  return hr.map((h) => {
    const hrTemplates = templates.filter((tpl) => tpl.hrId === h.id);
    const relatedClient = clients.find(c => c.id === h.clientId);

    if (!relatedClient) {
      throw new Error(`Client not found for HR ID: ${h.id}`);
    }

    return { ...h, client: relatedClient, templates: hrTemplates };
  });
}

// function getTemplateByHR(hrId: number): EmailTemplate | undefined {
//   return template.find(t=>t.hrId === hrId);
// }

// function getHRbyTemplate(hrs: HR[], templates: EmailTemplate[]): TemplateWithHR[] {
//   return templates.map((tpl) => {
//     const hr = hrs.find((h) => h.id === tpl.hrId) || null;
//     return { ...tpl, hr };
//   });
// }

const data = getClientsWithHRs(clients, hr);
const hrdata = getHRsWithClients(hr, clients);
const templateData = getTemplateWithHR(hr, clients, template);

const ClientsPage = () => {
  const tabs = ["Client & HR", "Email Templates"]
  const [activeTab, setActiveTab] = useState('Client & HR')
  type ViewType = 'client' | 'hr';
  const [view, setView] = useState<ViewType>('client')

  const renderContent = () => {
    switch (activeTab) {
      case "Client & HR":
        return (
          <>
            <div>
              <div className="flex justify-between">
                <div className="mt-8 text-md font-bold">
                  {view === 'client' && (
                    <div>
                      Total Clients: <span className="ml-2 p-1 bg-blue-600 text-white rounded-md">{data.length}</span>
                    </div>
                  )}
                  {view === 'hr' && (
                    <div>
                      Total HRs: <span className="ml-2 p-1 bg-blue-600 text-white rounded-md">{hrdata.length}</span>
                    </div>
                  )}
                </div>
                <div className="inline-flex font-semibold rounded-md shadow-sm border border-gray-300 overflow-hidden my-8">
                  <button
                    onClick={() => setView("client")}
                    className={`px-4 text-sm focus:outline-none transition-colors duration-200 ease-in-out
                                            ${view === "client"
                        ? "bg-white text-gray-900"
                        : "bg-gray-300 text-gray-500 hover:bg-gray-200"
                      }`}
                  >
                    Clients
                  </button>
                  <button
                    onClick={() => setView("hr")}
                    className={`px-4 text-sm focus:outline-none transition-colors duration-200 ease-in-out
                                            ${view === "hr"
                        ? "bg-white text-gray-900"
                        : "bg-gray-300 text-gray-500 hover:bg-gray-200"
                      }`}
                  >
                    HRs
                  </button>
                </div>
              </div>
              {view === 'client' && (
                <>
                  <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data.map((client) => (
                      <ClientCard key={client.id} client={client} />
                    ))}
                  </div>
                </>

              )}
              {view === 'hr' && (
                <>
                  <div className="grid mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {hrdata.map((hr) => (
                      <HRCard key={hr.id} details={hr} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )
      case "Email Templates":
        return (
          <>
            <div>
              <div className="flex justify-between">
                <div className="mt-8 text-md font-bold">
                  Active Templates: <span className="ml-2 p-1 bg-blue-600 text-white rounded-md">{templateData.length}</span>
                </div>
              </div>
              <div className="mt-8">
                <EmailFormatList data={templateData} />
              </div>
            </div>
          </>
        )
      default:
        return (
          <>
          </>
        )
    }
  }

  return (
    <div className="w-full bg-blueLight-50 p-4 relative">
      <div className="text-lg">
        <div className="flex space-x-8 text-xs font-bold border-b border-gray-300 mb-8">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`p-2 ${activeTab === tab ? "border-b-2 border-blue-600" : "text-gray-500"}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </div>
  )
}

export default ClientsPage