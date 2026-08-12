"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { User, Building, Car, Shield, Phone, FileText, Plus, Zap, CheckCircle2 } from "lucide-react";

export const ResidentProfileModule: React.FC = () => {
  const { society } = useSociety();

  const [familyMembers, setFamilyMembers] = useState([
    { name: "Pooja Sharma", relation: "Spouse", phone: "+91 98765 11111", access: "Full Gate Pass Access" },
    { name: "Rohan Sharma", relation: "Son", phone: "+91 98765 22222", access: "Gate Pass Access" }
  ]);

  const [vehicles, setVehicles] = useState([
    { type: "Car (SUV)", model: "Hyundai Creta", plateNumber: "DL 01 AB 8040", slot: "B1-204", evCharging: false },
    { type: "EV Two-Wheeler", model: "Ather 450X", plateNumber: "DL 01 EV 9901", slot: "B1-204-B", evCharging: true }
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Household & Vehicle Management
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Manage household members, parking slot allocations, registered vehicles & emergency contact authorizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Resident Card */}
        <div className="saas-card p-6 space-y-4 md:col-span-1">
          <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
            <div className="w-14 h-14 bg-neutral-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-xs">
              AS
            </div>
            <div>
              <h2 className="font-bold text-base text-neutral-900">Alex Sharma</h2>
              <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">
                Verified Flat Owner
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Resident ID:</span>
              <span className="font-mono font-bold text-neutral-900">RES-2026-A204</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Tower & Unit:</span>
              <span className="font-bold text-neutral-900">Tower A • Apt 204</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Society:</span>
              <span className="font-bold text-neutral-900">{society.name}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Primary Phone:</span>
              <span className="font-mono text-neutral-900">+91 98765 43210</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Email:</span>
              <span className="font-mono text-neutral-900">alex.sharma@demo.com</span>
            </div>
          </div>

          <div className="p-3 bg-neutral-100 rounded-xl text-[11px] text-neutral-600 space-y-1">
            <div className="font-bold text-neutral-900">Digital Gate Pass Privilege</div>
            <div>Authorized to approve visitors, delivery entry & emergency dispatches.</div>
          </div>
        </div>

        {/* Family Members & Registered Vehicles */}
        <div className="space-y-6 md:col-span-2">
          
          {/* Family Members */}
          <div className="saas-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="font-bold text-sm text-neutral-900">
                Registered Family Members ({familyMembers.length})
              </h3>
              <button
                onClick={() => {
                  const name = prompt("Enter family member name:");
                  const relation = prompt("Enter relation (e.g. Daughter/Father):");
                  if (name && relation) {
                    setFamilyMembers((prev) => [...prev, { name, relation, phone: "+91 98765 XXXXX", access: "Gate Pass Access" }]);
                  }
                }}
                className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Member
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {familyMembers.map((fam, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div>
                    <div className="font-bold text-neutral-900">{fam.name}</div>
                    <div className="text-neutral-500 text-[11px]">{fam.relation} • {fam.access}</div>
                  </div>
                  <div className="text-neutral-500 font-mono text-xs">{fam.phone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Vehicles */}
          <div className="saas-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="font-bold text-sm text-neutral-900">
                Registered Vehicles & Parking Slots ({vehicles.length})
              </h3>
              <button
                onClick={() => alert("Vehicle registration request sent to Estate Office for parking RFID tag generation.")}
                className="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Register Vehicle
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {vehicles.map((veh, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-neutral-200 text-neutral-900 rounded-lg">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-neutral-900 flex items-center gap-2">
                        <span>{veh.model} ({veh.type})</span>
                        {veh.evCharging && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Zap className="w-3 h-3 text-emerald-600" /> EV Supercharger
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-500 text-[11px] font-mono">Plate Number: {veh.plateNumber}</div>
                    </div>
                  </div>

                  <div className="bg-neutral-900 text-white font-mono font-bold text-xs px-3 py-1.5 rounded-lg">
                    Slot {veh.slot}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
