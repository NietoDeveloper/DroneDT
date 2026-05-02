"p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                            title="Banear Usuario"
                          >
                            <UserMinus size={14} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            className="p-1.5 text-zinc-400 hover:text-green-500 hover:bg-green-50 rounded-md transition-all"
                            title="Activar Usuario"
                          >
                            <ShieldCheck size={14} />
                          </button>
                        )}
                        <button className="p-1.5 text-zinc-400 hover:text-gold hover:bg-gold/5 rounded-md transition-all">
                          <ShieldAlert size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}